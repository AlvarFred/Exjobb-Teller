<script>
    import {
      Page,
      Button,
	  Navbar
    } from 'konsta/svelte';
    import {defaultList} from '$lib/defaultList';
	import CircularChart from './CircularChart.svelte';
	import CalenderStats from './CalenderStats.svelte';
    import settingSVG from '$lib/assets/settings.svg';
    import { dailyGoal } from '$lib/dailyGoal';

    export let data;
</script>

<Page class="flex flex-col">
    <Navbar transparent>
        <a slot="right" href="/settings">
            <button  class="bg-[#D9D9D9] p-2 mx-2 rounded-lg"> 
                <img src={settingSVG} alt="Setting icon">
            </button>
        </a>
    </Navbar>

    <div class="flex flex-col grow items-center justify-between mt-8">
        <CircularChart color={"#8BC34A"} current={data.weeks[3].days[data.weekday]} goal={$dailyGoal}/>
        <CalenderStats weeks={data.weeks} today={data.weekday}/>

        <div class="w-full">
            <Button a href="/ingame/{$defaultList}" class="k-color-main-green  max-w-[60vw] h-[6vh] mx-auto my-8 text-xl">
                Start
            </Button>
            <Button a href="/lists"  outline class="k-color-main-green max-w-[60vw] h-[6vh] mx-auto mb-[64px]  text-xl">
                Lists
            </Button>
        </div>
    </div>

</Page>

<style>
</style>
