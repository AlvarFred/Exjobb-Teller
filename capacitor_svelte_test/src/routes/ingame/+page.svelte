<script>
	import { SpeechRecognition } from '@capacitor-community/speech-recognition';
	import { onMount } from 'svelte';
	import micIcon from '$lib/assets/mic.svg';
	import {wordErrorRate} from '$lib/wer.js'
	import nature from '$lib/assets/nature.jpg'
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
			img: ''
		},
		{
			affirmation: 'The second affirmation, now i am supposed to say somthing good about myself',
			img: ''
		},
		{ affirmation: 'The third affirmation, this one is really hard', img: '' }
	];
	const allowedWER = 0.3;
	let text = '';
	let progress = 0;
	let totalAffirmations = dummyData.length;
	let done = false;
	let listening = false;

	onMount(() => {
		SpeechRecognition.addListener('partialResults', (data) => {
			text = data.matches[0];
			console.log('partialResults was fired', data.matches);
		});
        SpeechRecognition.addListener('listeningState', (data)=>{
            if(data.status == 'stopped'){
				listening = false;
                console.log('###########################\ngot: ', text, '\nwas: ', dummyData[progress].affirmation)
                const wer = wordErrorRate(text.toLocaleLowerCase(), dummyData[progress].affirmation.toLocaleLowerCase());

			if (wer > allowedWER) {
				//fail
				console.log('Failed: WER = ', wer, ' > allowed = ', allowedWER);
				// TODO: Show user that speech recognition failed
			} else {
				//success
				console.log('Success: WER = ', wer, ' < allowed = ', allowedWER);
				// TODO: Do some cool animation to show user speech recognition succeeded
				step();
			}
            }
        })
	});
	const start = async () => {
		if (await SpeechRecognition.available()) {
			console.log(await SpeechRecognition.checkPermissions());
			if (await SpeechRecognition.checkPermissions()) await SpeechRecognition.checkPermissions();
			
			// if no permission
			await SpeechRecognition.requestPermissions();
			
			SpeechRecognition.start({
				language: 'en-US',
				maxResults: 2,
				prompt: 'Say something',
				partialResults: true,
				popup: false
			});
			listening = true;
		} else {
			alert('Speech recognition is not available');
		}
	};

	const step = () => {
		if (progress == totalAffirmations - 1) {
			done = true;
		}
		progress += 1;
	};
	
</script>

<Page class="  bg-white z-0">
	<Navbar transparent>
		<NavbarBackLink slot="left" text="Back" onClick={() => history.back()} />
	</Navbar>
	<img alt="background showing nature" src={nature} class="background-image {done ? 'animate' : ''}"/>
	<Card raised class="bg-black z-10">
		{#if done}
			<p>Done</p>
		{:else}
			<p class="text-2xl">{dummyData[progress].affirmation}</p>
		{/if}
	</Card>

	<Block class="w-full absolute bottom-0 ">
		<Fab class="rounded-full mx-auto animate-puls {listening ? 'animate-pulse k-color-my-color' : ''}" onClick={start}>
			<img alt="microphone" slot="icon" src={micIcon} />
		</Fab>

		<Button class="max-w-[64px] mx-auto my-16" onClick={step}>Skip</Button>

		<Progressbar class="" progress={progress / totalAffirmations} />
	</Block>
</Page>

<style>
	.background-image{
		background-image: url('$lib/assets/nature.jpg');
		position: absolute;
		z-index: -1;
		height: 100vh;
		width: 100%;
		top: 0;
		filter: blur(8px);
  -webkit-filter: blur(8px);
	}
	.animate{
		animation: blur-animation 3s ease-in forwards;

	}
	@keyframes blur-animation{
		100% {
			filter: blur(0px);
  			-webkit-filter: blur(0px);
			z-index: 5;
		}
	}
</style>
