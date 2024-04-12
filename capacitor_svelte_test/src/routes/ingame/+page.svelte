<script>
	import { SpeechRecognition } from '@capacitor-community/speech-recognition';
	import { onMount} from 'svelte';
	import {fade, fly} from 'svelte/transition';
	import micIcon from '$lib/assets/mic.svg';
	import {wordErrorRate} from '$lib/wer.js';
	import nature from '$lib/assets/nature.jpg';
	import nature2 from '$lib/assets/nature2.jpeg';

	import {
		Page,
		Fab,
		Card,
		Progressbar,
		Button,
		Navbar,
		NavbarBackLink,
		Block,
		BlockHeader,
		BlockFooter
	} from 'konsta/svelte';

	const dummyData = [
		{
			affirmation:
				' The first. I am so good like the best and stuff its crazy how good i am like just wow',
			img: nature
		},
		{
			affirmation: 'The second affirmation, now i am supposed to say something good about myself',
			img: nature2
		},
		{ affirmation: 'The third affirmation, this one is really hard', img: nature }
	];
	const allowedWER = 0.3;
	let speechInput = '';
	let progress = 0;
	let totalAffirmations = dummyData.length;
	let done = true;
	let listening = false;
	let sentenceComplete = true;
	
	const startListening = async () => {
		// Check if device has speech recognition
		const available = await SpeechRecognition.available();
		if (!available.available) alert('Speech recognition is not available');

		// Ask user for mic permissions if it isn't already granted
		let hasPremissions = await SpeechRecognition.checkPermissions()
		console.log("00000000000\n",hasPremissions.speechRecognition, "\n00000000000");
		if (hasPremissions.speechRecognition != "granted") await SpeechRecognition.requestPermissions();
		

		try{
			listening = true;
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

			console.log('###########################\ngot: ', speechInput, '\nwas: ', dummyData[progress].affirmation)

			// Calculate Word Error Rate
            const wer = wordErrorRate(speechInput, dummyData[progress].affirmation);

			if (wer > allowedWER) {
				// Fail
				console.log('Failed: WER = ', wer, ' > allowed = ', allowedWER);
				// TODO: Show user that speech recognition failed
			} else {
				// Success
				console.log('Success: WER = ', wer, ' < allowed = ', allowedWER);
				// TODO: Do some cool animation to show user speech recognition succeeded
				sentenceComplete = true
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
		} 
		progress += 1;
		
	};

	const next = () => {
		if(!sentenceComplete) return;
		sentenceComplete = false;
		step();
	}
	
</script>

<Page class="  bg-white z-0">
	<Navbar transparent>
		<NavbarBackLink slot="left" text="Back" onClick={() => history.back()} />
	</Navbar>
	<img alt="background showing nature" src={done ? dummyData[0].img : dummyData[progress].img} class="background-image {sentenceComplete ? 'animate' : ''}" on:click={next}/>
	{#if !done}
	<div  class="{sentenceComplete ? 'animate-fade' : ''}">
		<Card raised class="bg-black z-10 {sentenceComplete ? 'animate-fade' : ''}">
			{#if done}
				<p>Done</p>
			{:else}
				<p class="text-2xl">{dummyData[progress].affirmation}</p>
			{/if}
		</Card>
	</div>

	<Block class="w-full absolute bottom-0 ">
		<div class="{sentenceComplete ? 'animate-fade' : ''}">

			<Fab class="rounded-full mx-auto animate-puls {listening ? 'animate-pulse k-color-my-color' : ''}" onClick={startListening}>
				<img alt="microphone" slot="icon" src={micIcon} />
			</Fab>
	
			<Button class="max-w-[64px] mx-auto my-16" onClick={step}>Skip</Button>
		</div>

		<Progressbar class="" progress={progress / (totalAffirmations)} />
	</Block>
	{:else}
		<div class="  h-[50vh] w-[100%] text-center  rounded-lg" transition:fly={{delay: 100, duration: 2000, y: '100vh'}}>
				<Block class="bg-black bg-opacity-0 rounded-lg mx-[14px] mt-[15vh]">

					<p class= "text-shadow text-5xl  text-white font-bold">Good Job!</p>
					<p class= "text-shadow text-2xl text-white">{totalAffirmations} Affirmations Completed!</p>
				</Block>
			</div>
				<div transition:fade={{delay:100, duration: 2000}}>
					<Block  class="bg-black bg-opacity-0 flex rounded-lg h-[15vh] my-[0px] justify-between items-center  absolute bottom-0 w-[100%]">
						<Button class=" k-color-light-blue  drop-shadow-[0px_4px_8px_black] mx-[5px] w-[40vw] " >Go Again</Button>
						<Button onClick={() => history.back()} class="drop-shadow-[0px_4px_8px_black] mx-[5px] w-[40vw]">Return Home</Button>
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
		/* filter: blur(8px); */
 		/* -webkit-filter: blur(8px);  */
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
</style>
