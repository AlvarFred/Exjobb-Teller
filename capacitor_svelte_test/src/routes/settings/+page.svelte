<script>
	import { Block, BlockTitle, Button, Navbar, NavbarBackLink, Page, Toast, Toggle } from 'konsta/svelte';
    import { Preferences } from '@capacitor/preferences';
    import {rescheduleNotification, disableNotifications} from '$lib/notifications.js'

    export let data;
    let notificationsEnabled = data.enabled === "true";
    let time = data.time;
    let toastOpen = false;
    let error = false;

    const toggleNotifications = () => {
        notificationsEnabled = !notificationsEnabled;
    }

    const openToast = () => {
        toastOpen = true;
        setTimeout(() => {
            toastOpen = false;
        }, 3000);
    }
  
    const save = async () => {
        
        const [hour, minute] = time.split(':');
        console.log(hour,minute)
        if(hour === "" || hour === null){
            time = data.time;
            console.log(time);
            error = true;
            openToast();
            return;
        }
        await Preferences.set({
            key: "notificationsEnabled",
            value: notificationsEnabled.toString()
        });

        
        await Preferences.set({key: "notificationHour", value: hour});
        await Preferences.set({key: "notificationMinute", value: minute});
        if(notificationsEnabled){
            await rescheduleNotification(hour,minute);
        } else{
            await disableNotifications();
        }
        error = false;
        openToast();
    }

</script>
<Page>
    <Navbar title="Settings">
        <NavbarBackLink slot="left" text="Back" onClick={() => history.back()} />
    </Navbar>
    <BlockTitle class="mx-4">Daily Notifications</BlockTitle>
    <Block class="flex items-end justify-between mx-4">
        <Toggle class="justify-self-end" checked={notificationsEnabled} onChange={toggleNotifications}/>

        <!-- <label class=" " for="Hour">When:</label> -->   
        <input 
        class="text-xl text-right {notificationsEnabled ? '' : 'disabled'}" 
        disabled={!notificationsEnabled}
        type="time" 
        bind:value={time} 
        />
        
           
    </Block>
    <Block class="absolute bottom-0 flex justify-end w-[100vw]">
        <Button class="w-[20vw]" onClick={save}>Save</Button>
    </Block>
    <Toast opened={toastOpen} class="text-center">
        {#if error}
            <p>Failed to save changes</p>
        {:else}
            <p>Changes saved</p>
        {/if}
    </Toast>
</Page>

<style>
    .disabled{
        color: gray;
    }

    input{
        max-width: 120px;
        height: 30px; 
        background-color: #FEFBFF;
    }


</style>