<script>
	import { SpeechRecognition } from '@capacitor-community/speech-recognition';
	import {fade, fly} from 'svelte/transition';
	import micIcon from '$lib/assets/mic.svg';
	import {wordErrorRate} from '$lib/wer.js';
    import Fail_Sound from '$lib/audio/Fail_Sound.wav'
    import success_sound from '$lib/audio/success_sound.wav'
	import {increaseStats} from '$lib/statistics.js'
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

    const failAudio = new Audio(Fail_Sound);
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
    $: cardAnimation = sentenceFailed ? 'animate-shake' : sentenceComplete ? 'animate-fade' : ''
    $: micAnimation = listening ? 'animate-mic-pulse bg-red-600' : (userActivatedMic && !listening) ? 'animate-mic-retract' : ''
	$: imageSrc = done ? data.list.img[progress - 1] : data.list.img[progress]

	const startListening = async () => {
        
        // If user clicks on the non-visible microphone button when image is being showed, send user to next affirmation
        if(sentenceComplete){
            next();
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
            logData(jsonData, 'data.json')
                        
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
                successAudio.play()
				//step();
			}
		} catch(e){
			console.log(e)
			listening = false;
		}
	};

	const step = () => {
		if (progress == totalAffirmations - 1) {
			done = true;
			sentenceComplete = true;
			increaseStats();
		} 
		progress += 1;
		
	};

	const next = () => {
		if(!sentenceComplete) return;
		sentenceComplete = false;
		step();
	}

	const reset = () => {
		progress = 0;
		done = false;
		listening = false;
		sentenceComplete = false;
	}

    const triggerExitPrompt = () => {
        // If list is completed, no need to show prompt as all data has been saved
        if (done){
			window.location = '/';
        }
        exitPrompt = true;
    }

</script>

<Page class="bg-white z-0">
	<Navbar transparent>
		<NavbarBackLink class="" style="padding: 20px;" slot="left" text="Back" onClick={triggerExitPrompt} />
	</Navbar>
	
    <img alt="background showing nature" src={imageSrc} class="background-image {sentenceComplete ? 'animate' : ''}" on:click={next}/>
	
    <Dialog opened={exitPrompt} onBackdropClick={() => (exitPrompt = false)}>
        <svelte:fragment slot="title">Do you want to exit?</svelte:fragment>
        All current progress will be lost.
        <svelte:fragment slot="buttons">
            <DialogButton onClick={() => window.location = '/'}>
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

        <Block class="w-full absolute bottom-0 ">
            <div class="{sentenceComplete ? 'animate-fade' : ''}">

                <Fab class="{micAnimation} rounded-full w-[20vw] h-[20vw] mx-auto border-0" onClick={startListening}>
                    <img style="transform: scale(1.5);" alt="microphone" slot="icon" src={micIcon} />
                </Fab>

                <Button class="max-w-[24vw] h-[5vh] mx-auto my-16" onClick={step}>Skip</Button>
            </div>

            <Progressbar class="rounded-full h-[1.2vh]" progress={progress / (totalAffirmations)} />
        </Block>
        
    {:else}
        <div class="h-[50vh] w-[100%] text-center  rounded-lg" in:fly={{delay: 100, duration: 2000, y: '100vh'}} out:fly={{delay: 0, duration: 1, y: '100vh'}}>
            <Block class="bg-black bg-opacity-0 rounded-lg mx-[14px] mt-[15vh]">
	    		<p class= "text-shadow text-5xl  text-white font-bold">Good Job!</p>
	    		<p class= "text-shadow text-2xl text-white">{totalAffirmations} Affirmations Completed!</p>
	    	</Block>
	    </div>

		<div in:fade={{delay:100, duration: 1500}} out:fade={{delay:0, duration: 1}}>
			<Block class="bg-black bg-opacity-0 flex rounded-lg h-[15vh] my-[0px] justify-between items-center absolute bottom-0 w-[100%]">
				<Button onClick={()=> reset()} class=" k-color-light-blue  drop-shadow-[0px_4px_8px_black] mx-[5px] w-[40vw] " >Go Again</Button>
				<Button a href="/" class="drop-shadow-[0px_4px_8px_black] mx-[5px] w-[40vw]">Return Home</Button>
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
		z-index: -1;
		height: 100vh;
		width: 100%;
		top: 0;
		filter: blur(8px);
 		-webkit-filter: blur(8px);
        object-fit: cover;
	}

	.animate{
		animation: blur-animation 2s ease-in forwards;
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
