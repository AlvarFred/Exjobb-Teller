<script>
	import { Block, BlockTitle, Button, ListInput, Navbar, NavbarBackLink, Page, Toggle } from 'konsta/svelte';
    import { Preferences } from '@capacitor/preferences';
    import {rescheduleNotification, disableNotifications} from '$lib/notifications.js'
    export let data;
    console.log(data)
    let notificationsEnabled = data.enabled === "true";
    let time = data.time;

    const toggleNotifications = () => {
        notificationsEnabled = !notificationsEnabled;
    }
    const save = async () => {
        await Preferences.set({
            key: "notificationsEnabled",
            value: notificationsEnabled.toString()
        });

        const [hour, minute] = time.split(':');
        await Preferences.set({key: "notificationHour", value: hour});
        await Preferences.set({key: "notificationMinute", value: minute});
        if(notificationsEnabled){
            await rescheduleNotification(hour,minute);
        } else{
            await disableNotifications();
        }
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
        bind:value={time} />
        
           
    </Block>
    <Block class="absolute bottom-0 flex justify-end w-[100vw]">
        <Button class="w-[20vw]" onClick={save}>Save</Button>
    </Block>
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