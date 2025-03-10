<script>
	import { SpeechRecognition } from '@capacitor-community/speech-recognition';
	import {fade, fly, scale} from 'svelte/transition';
	import micIcon from '$lib/assets/mic.svg';
	import {wordErrorRate} from '$lib/wer.js';
    import fail_sound from '$lib/audio/fail_sound.mp3'
    import success_sound from '$lib/audio/success_sound.wav'
	import {increaseStats, receivedStar} from '$lib/statistics.js'
	import StarSvg from "./../../starSvg.svelte";
    import { Confetti } from 'svelte-confetti'
	import {
		Page,
		Fab,
		Card,
		Progressbar,
		Button,
		Navbar,
		NavbarBackLink,
		Block,
        Dialog,
        DialogButton
	} from 'konsta/svelte';
	import {logData} from '$lib/logData.js';
	export let data;

    const failAudio = new Audio(fail_sound);
    const successAudio = new Audio(success_sound);

	const allowedWER = 0.3;
	let speechInput = '';
	let progress = 0;
	let totalAffirmations = data.list.affirmation.length;
	let done = false;
	let listening = false;
	let sentenceComplete = false;
    let sentenceFailed = false;
    let userActivatedMic = false;
    let exitPrompt = false;
	let placeOnTop = false;

    $: cardAnimation = sentenceFailed ? 'animate-shake' : sentenceComplete ? 'animate-fade' : ''
    $: micAnimation = listening ? 'animate-mic-pulse bg-red-600' : (userActivatedMic && !listening) ? 'animate-mic-retract' : ''
	$: imageSrc = done ? data.list.img[progress - 1] : data.list.img[progress]

	const startListening = async () => {
        
        // Don't let user click on the microphone button when sentence is complete
        if(sentenceComplete){
            return;
        }

        // Check if device has speech recognition
		const available = await SpeechRecognition.available();
		if (!available.available) alert('Speech recognition is not available');
        
		// Ask user for mic permissions if it isn't already granted
		let hasPremissions = await SpeechRecognition.checkPermissions()
		console.log("00000000000\n",hasPremissions.speechRecognition, "\n00000000000");
		if (hasPremissions.speechRecognition != "granted") await SpeechRecognition.requestPermissions();
        
        
        // Reset sentence failed if user has already failed one time
        sentenceFailed = false;
        
		try{
            listening = true;
            userActivatedMic = true;
			const matches = await SpeechRecognition.start({
                language: 'en-US',
				maxResults: 2,
				prompt: 'Say something',
				partialResults: false,
				popup: false
			});
			listening = false;
            
			// Set input to the most probable match
			speechInput = matches.matches[0];
            
			console.log('###########################\ngot: ', speechInput, '\nwas: ', data.list.affirmation[progress])

			// Calculate Word Error Rate
            const wer = wordErrorRate(speechInput, data.list.affirmation[progress]);

			// Log data
			const status = wer < allowedWER;
            const jsonData = JSON.stringify({
                "success": status, 
                "wer": wer, 
                "allowedWER": allowedWER, 
                "original-sentence": data.list.affirmation[progress],
                "received-sentence": speechInput
            })
			
            console.log("###################", jsonData)

            // Log data
            logData(jsonData, 'data.txt')
                        
			if (wer > allowedWER) {
                // Fail
				console.log('Failed: WER = ', wer, ' > allowed = ', allowedWER);
				// TODO: Show user that speech recognition failed

                // User failed sentence and feedback should be submitted
                sentenceFailed = true;

                console.log("##### PLAY FAIL AUDIO")
                failAudio.play();
			} else {
				// Success
				console.log('Success: WER = ', wer, ' < allowed = ', allowedWER);
				// TODO: Do some cool animation to show user speech recognition succeeded
				sentenceComplete = true
				setOnTop();
                successAudio.play()
				//step();
			}
		} catch(e){
			console.log(e)
			listening = false;
		}
	};

	// Put image on top so users can't press any of the buttons.
	const setOnTop = () => {
		setTimeout(() => {
			placeOnTop = true;
		}, 3500);
	}

	// Move user to next sentence
	const step = () => {
		if (progress == totalAffirmations - 1) {
			done = true;
			sentenceComplete = true;
			placeOnTop = false;
			increaseStats();
		} 
		progress += 1;
		
	};

	const next = () => {
		// Can only proceed if user is done with sentence and if animation is done
		if(!sentenceComplete || !placeOnTop) return;
		sentenceComplete = false;
		placeOnTop = false;
		step();
	}

	const skip = ()=> {
		// Do not skip if user is already done.
		if(sentenceComplete) return;
		step();
	}

	const reset = () => {
		progress = 0;
		done = false;
		listening = false;
		sentenceComplete = false;
		placeOnTop = false;
        receivedStar.set(true);
	}

    const triggerExitPrompt = () => {
        exitPrompt = true;
    }

</script>

<Page class="bg-white z-0">
	<Navbar transparent>
		<NavbarBackLink class="" style="padding: 20px;" slot="left" text="Back" onClick={triggerExitPrompt} />
	</Navbar>
	{#each data.list.affirmation as _, i}
        <img 
            alt="background showing nature" 
            src={data.list.img[i]} 
            class="background-image 
                {i == progress || i == progress - 1 ? '' : 'hidden'}
                {sentenceComplete ? 'animate' : ''}
                {placeOnTop ? ' z-20' : 'z-[-1]'}" 
            on:click={next}/>

    {/each}
	
    <Dialog opened={exitPrompt} onBackdropClick={() => (exitPrompt = false)}>
        <svelte:fragment slot="title">Do you want to exit?</svelte:fragment>
        All current progress will be lost.
        <svelte:fragment slot="buttons">
            <DialogButton  a href="/">
                Yes
            </DialogButton>
            <DialogButton strong onClick={() => exitPrompt = false}>
                No
            </DialogButton>
        </svelte:fragment>
    </Dialog>

    {#if !done}
        <div class="{cardAnimation}">
            <Card raised class="bg-black z-10 text-center my-10">
                {#if done}
	    		<p>Done</p>
                {:else}
	    		<p class="text-2xl">{data.list.affirmation[progress]}</p>
                {/if}
            </Card>
        </div>

        <Block class="w-full absolute bottom-0 z-10">
            <div class="{sentenceComplete ? 'animate-fade' : ''}">

                <Fab class="{micAnimation} rounded-full w-[20vw] h-[20vw] mx-auto border-0" onClick={startListening}>
                    <img style="transform: scale(1.5);" alt="microphone" slot="icon" src={micIcon} />
                </Fab>

                <Button class="max-w-[24vw] h-[5vh] mx-auto my-16 k-color-primary-green" onClick={skip}>Skip</Button>
            </div>
        </Block>
		<div class="absolute bottom-0 w-full p-4 mb-8 z-30">
			<Progressbar class="rounded-full h-[1.2vh] k-color-primary-green z-30" progress={progress / (totalAffirmations)} />
		</div>
        
    {:else}
        <div class="flex justify-center w-[100%] mt-8" in:scale={{delay: 800, duration: 800, opacity: 1, start: 0}} out:scale={{delay: 0, duration: 1, opacity: 0}}>
            {#if !$receivedStar}
                <Confetti delay={[1500, 1200]} duration=2100 colorArray={["#ffffff"]} x={[-0.9, 0.1]} y={[-0.5, 1]}/>
                <StarSvg completed={true} width={70} height={70} dropShadow={true}/>
                <Confetti delay={[1500, 1200]} duration=2100 colorArray={["#ffffff"]} x={[-0.1, 0.9]} y={[-0.5, 1]}/>
            {/if}
        </div>
        
        <div class="h-[30vh] w-[100%] text-center rounded-lg" in:fly={{delay: 100, duration: 2000, y: '100vh'}} out:fly={{delay: 0, duration: 1, y: '100vh'}}>
            <Block class="bg-black bg-opacity-0 rounded-lg mx-[14px] mt-[6vh]">
	    		<p class="text-shadow text-5xl text-white font-bold">Good Job!</p>
	    		<p class="text-shadow text-2xl text-white">{totalAffirmations} Affirmations Completed!</p>
	    	</Block>
	    </div>

		<div in:fade={{delay:100, duration: 1500}} out:fade={{delay:0, duration: 1}}>
			<Block class="bg-black bg-opacity-0 flex rounded-lg h-[15vh] my-[0px] justify-between items-center absolute bottom-0 w-[100%]">
				<Button  onClick={()=> reset()} class=" k-color-primary-green  drop-shadow-[0px_4px_8px_black] mx-[5px] w-[40vw] " >Go Again</Button>
				<Button a href="/" class="drop-shadow-[0px_4px_8px_black] mx-[5px] w-[40vw] k-color-primary-green">Return Home</Button>
			</Block>
		</div>
	{/if}
</Page>

<style>
	.text-shadow{
		/* offset-x | offset-y | blur-radius | color */
		text-shadow: 0px 0px 4px black;
	}
	.background-image{
		position: absolute;
		height: 100vh;
		width: 100%;
		top: 0;
		filter: blur(8px);
 		-webkit-filter: blur(8px);
        object-fit: cover;
	}

	.animate{
		animation: blur-animation 3s ease-in forwards;
	}
	@keyframes blur-animation{
		100% {
			filter: blur(0px);
  			-webkit-filter: blur(0px);
			/* z-index: 5; */
		}
		
	}

	.animate-fade{
		animation: fade 3s ease-in forwards;
	}
	@keyframes fade{
		100%{
			opacity: 0;
		}
	}

    .animate-shake{
        animation: shake 150ms linear forwards;
    }
    @keyframes shake{
        0% {
		    transform: translate(3px, 0);
		  }
		  50% {
		    transform: translate(-3px, 0);
		  }
		  100% {
		    transform: translate(0, 0);
		  }
    }

    .animate-mic{
        animation: pulse 3s ease-in forwards;
    }
</style>
