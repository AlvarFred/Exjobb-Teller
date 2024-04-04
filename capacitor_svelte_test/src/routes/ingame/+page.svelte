<script>
    import { SpeechRecognition } from "@capacitor-community/speech-recognition"; 
    import {onMount} from 'svelte';
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
    let text = "nothi" 
</script>


<h1>ingame</h1>
<button on:click={start}>Start</button>
<p>{text}</p>

<style>

</style>