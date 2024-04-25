<script>
	import { Block, BlockTitle, Button, ListInput, Navbar, NavbarBackLink, Page, Toggle } from 'konsta/svelte';

    let notificationsEnabled = true;
    const toggleNotifications = () => {
        notificationsEnabled = !notificationsEnabled;
    }
    const save = () => {

    }
    const hourOnChange = (e) => {
        console.log(e)
    }
    let hour = 13;
    let minute = 30;
</script>
<Page>
    <Navbar title="Settings">
        <NavbarBackLink slot="left" text="Back" onClick={() => history.back()} />
    </Navbar>
    <BlockTitle>Daily Notifications</BlockTitle>
    <Block class="flex items-end justify-between">
        <Toggle class="justify-self-end" checked={notificationsEnabled} onChange={toggleNotifications}/>
        <div class="flex items-end {notificationsEnabled ? '' : 'disabled'}">
            <div class="mx-[10px] ">
                <label class="block " for="Hour">Hour</label>
                <input 
                    class="text-center block border-2 outline-gray-700"
                    name="hour" disabled={!notificationsEnabled} 
                    type="number" 
                    bind:value={hour} 
                    on:change={(e)=>{hourOnChange(e.target.value)}}
                    pattern="[0-9]*"
                    required
                 />
            </div>
            <p class="text-4xl">:</p>
            <div class="mx-[10px]">
                <label class="block" for="minute">Minute</label>
                <input class="text-center block border-2" name="minute" disabled={!notificationsEnabled} type="number" bind:value={minute} pattern="[0-9]*"/>
            </div>
        </div>
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
        width: 40px;
        height: 30px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
</style>