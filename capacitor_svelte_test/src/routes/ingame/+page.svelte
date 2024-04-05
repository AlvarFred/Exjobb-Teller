<script>
    import { SpeechRecognition } from "@capacitor-community/speech-recognition"; 
    import {onMount} from 'svelte';
    import micIcon from '$lib/assets/mic.svg'
    import {
        Page,
        Fab,
        Card, 
        Progressbar,
        Button,
    } from 'konsta/svelte'
    onMount(() =>{
        SpeechRecognition.addListener("partialResults", (data) => {
            text = data.matches[0];
            console.log("partialResults was fired", data.matches);
            });
    });
    const start = async() => {
        if(await SpeechRecognition.available()){

            console.log(await SpeechRecognition.checkPermissions())
            if(await SpeechRecognition.checkPermissions())
            
            await SpeechRecognition.checkPermissions()

            // if no permission
            await SpeechRecognition.requestPermissions()
            
            SpeechRecognition.start({
                language: "en-US",
                maxResults: 2,
                prompt: "Say something",
                partialResults: true,
                popup: false,
            });

            // listen to partial results
            
        } else{
            alert("Speech recognition is not available")
        }
    }
    const step = ()=>{
        progress+=0.1;
    }
    let text = "nothi" 
    const dummyData = {
        affirmation: "i am so good like the best and stuff its crazy how good i am like just wow",
        img: ""
    }
    let progress = 0;
</script>

<Page class="flex items-center flex-col bg-white">
    <h1>ingame</h1>
    <p>{text}</p>
    <Card raised class="bg-red-200">
        Hello, please say something good about yourself
    </Card>
    <Card class="bg-red-200">
        Not raised in this card lol
    </Card>
    <Fab class="rounded-full" onClick={start}>
        <img alt="microphone" slot="icon" src={micIcon}/>
    </Fab>
    <Button onClick={step}>Skip</Button>
    
    <Progressbar class="min-h-2 w-96 self-end " {progress}/>
    
</Page>

<style>
</style>