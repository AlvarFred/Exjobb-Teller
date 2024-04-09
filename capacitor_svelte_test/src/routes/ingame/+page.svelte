<script>
	import { SpeechRecognition } from '@capacitor-community/speech-recognition';
	import { onMount } from 'svelte';
	import micIcon from '$lib/assets/mic.svg';
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
	onMount(() => {
		SpeechRecognition.addListener('partialResults', (data) => {
			text = data.matches[0];
			console.log('partialResults was fired', data.matches);
		});
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
			while (SpeechRecognition.isListening()) {}
			// Done listening
			const wer = wordErrorRate(text, dummyData[progress].affirmation);

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
		} else {
			alert('Speech recognition is not available');
		}
	};
	const wordErrorRate = (hypothesis, reference) => {
		// Tokenize the strings into words
		const hypothesisWords = hypothesis.trim().split(/\s+/);
		const referenceWords = reference.trim().split(/\s+/);

		// Initialize matrix for dynamic programming
		const dp = [];
		for (let i = 0; i <= hypothesisWords.length; i++) {
			dp[i] = [i];
		}
		for (let j = 1; j <= referenceWords.length; j++) {
			dp[0][j] = j;
		}

		// Calculate edit distance using dynamic programming (Levenshtein distance)
		for (let i = 1; i <= hypothesisWords.length; i++) {
			for (let j = 1; j <= referenceWords.length; j++) {
				if (hypothesisWords[i - 1] === referenceWords[j - 1]) {
					dp[i][j] = dp[i - 1][j - 1];
				} else {
					dp[i][j] = Math.min(
						dp[i - 1][j] + 1, // deletion
						dp[i][j - 1] + 1, // insertion
						dp[i - 1][j - 1] + 1 // substitution
					);
				}
			}
		}

		// WER is the minimum number of edits normalized by the number of reference words
		const wer = dp[hypothesisWords.length][referenceWords.length] / referenceWords.length;
		return wer;
	};

	const step = () => {
		if (progress == totalAffirmations - 1) {
			done = true;
		}
		progress += 1;
	};
	let text = 'nothi';
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
	let progress = 0;
	let totalAffirmations = dummyData.length;
	let done = false;
	const allowedWER = 0.3;
</script>

<Page class="  bg-white">
	<Navbar transparent>
		<NavbarBackLink slot="left" text="Back" onClick={() => history.back()} />
	</Navbar>

	<Card raised class="bg-black">
		{#if done}
			<p>Done</p>
		{:else}
			<p class="text-2xl">{dummyData[progress].affirmation}</p>
		{/if}
	</Card>

	<Block class="w-full absolute bottom-0 ">
		<Fab class="rounded-full mx-auto" onClick={start}>
			<img alt="microphone" slot="icon" src={micIcon} />
		</Fab>

		<Button class="max-w-[64px] mx-auto my-16 k-color-my-color" onClick={step}>Skip</Button>

		<Progressbar class="" progress={progress / totalAffirmations} />
	</Block>
</Page>

<style>
</style>
