<script>
	import { Block, BlockTitle, Button, Navbar, NavbarBackLink, Page, Toast, Toggle, Dialog, DialogButton } from 'konsta/svelte';
    import { Preferences } from '@capacitor/preferences';
    import {rescheduleNotification, disableNotifications} from '$lib/notifications.js'
    import {exportStats} from '$lib/exportStats.js'
    import {deleteLog} from '$lib/logData.js'
    import {eraseData} from '$lib/statistics.js'

    export let data;
    let notificationsEnabled = data.enabled === "true";
    let time = data.time;
    let toastOpen = false;
    let toastText;
    let showWarning = false;

    const toggleNotifications = () => {
        notificationsEnabled = !notificationsEnabled;
    }

    const openToast = () => {
        toastOpen = true;
        setTimeout(() => {
            toastOpen = false;
        }, 3000);
    }
  
    const resetData = async () => {
        try {
            await eraseData();
            await deleteLog('data.txt');
            toastText = "Deleted Data";
            openToast();
        } catch (e) {
            toastText = "Failed to delete data";
            openToast();
        }
        showWarning = false
    }

    const save = async () => {
        
        const [hour, minute] = time.split(':');
        console.log(hour,minute)
        if(hour === "" || hour === null){
            time = data.time;
            console.log(time);
            toastText = 'Failed to save changes';
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
        toastText = 'Changes saved';
        openToast();
    }

</script>
<Page>
    <Navbar class="bg-surface" title="Settings">
        <NavbarBackLink  a href="/" slot="left" text="Back"/>
    </Navbar>

    <BlockTitle class="mx-4 k-color-primary-green">Daily Notifications</BlockTitle>
    <Block class="flex items-end justify-between mx-4">
        <Toggle class="justify-self-end k-color-primary-green" checked={notificationsEnabled} onChange={toggleNotifications}/>

        <!-- <label class=" " for="Hour">When:</label> -->   
        <input 
            class="text-xl text-right {notificationsEnabled ? '' : 'disabled'}" 
            disabled={!notificationsEnabled}
            type="time" 
            bind:value={time} 
        />           
    </Block>
    
    <BlockTitle class="mx-4 k-color-primary-green"> Data </BlockTitle>
    <Block class="flex w-[100vw]">
        <Button class="w-[20vw] mx-4 k-color-primary-green" onClick={() => exportStats()}>
            Export Logs
        </Button>
        <Button class="k-color-primary-green" onClick={()=>{ showWarning = true}}>
            Reset Data
        </Button>
    </Block> 

    <Block class="absolute bottom-0 flex justify-end w-[100vw]">
        <Button class="w-[20vw] k-color-primary-green" onClick={save}>Save</Button>
    </Block>

    <Toast opened={toastOpen} class="text-center">
            <p>{toastText}</p>
    </Toast>

    <Dialog opened={showWarning} onBackdropClick={() => (showWarning = false)}>
        <svelte:fragment slot="title">Are you sure?</svelte:fragment>
        All data will be erased and can not be recovered.
        <svelte:fragment slot="buttons">
            <DialogButton  onClick={resetData}>
                Yes
            </DialogButton>
            <DialogButton strong onClick={() => showWarning = false}>
                No
            </DialogButton>
        </svelte:fragment>
    </Dialog>

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