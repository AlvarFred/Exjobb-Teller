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
        Navbar, 
        NavbarBackLink,
        Block,

		BlockHeader,

		BlockFooter


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
        progress+=1;
        if(progress == totalAffirmations){
            done = true;
        }
    }
    let text = "nothi" 
    const dummyData = [{
        affirmation: " The first. I am so good like the best and stuff its crazy how good i am like just wow",
        img: ""
    },
    {affirmation: "The second affirmation, now i am supposed to say somthing good about myself",
        img: ""},
        {affirmation: "The third affirmation, this one is really hard",
        img: ""}
]
    let progress = 0;
    let totalAffirmations = dummyData.length;
    let done = false;
</script>

<Page class="  bg-white">
    <Navbar transparent>
        <NavbarBackLink slot="left" text="Back" onClick={() => history.back()} />
    </Navbar>

    <Card raised >
        <p class="text-2xl">{dummyData[progress].affirmation}</p>
    </Card>

   
    <Block class="w-full absolute bottom-0 ">
        <Fab class="rounded-full mx-auto" onClick={start}>
            <img alt="microphone" slot="icon" src={micIcon}/>
        </Fab>
    
        <Button  class="max-w-[64px] mx-auto my-16"  onClick={step}>Skip</Button>
    
        <Progressbar class="" progress={progress/totalAffirmations}/>
    </Block>
</Page>

<style>
</style>