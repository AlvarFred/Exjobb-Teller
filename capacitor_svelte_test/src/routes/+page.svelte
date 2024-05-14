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

	let percentage = 25;

</script>

<Page>
    <Navbar transparent>
        <a slot="right" href="/settings">
            <button  class="bg-[#D9D9D9] p-2 mx-2 rounded-lg"> 
                <img src={settingSVG} alt="Setting icon">
            </button>
        </a>
    </Navbar>
    <div class="flex flex-col items-center justify-center h-[60vh]">
        <CircularChart color={"#8BC34A"} percentage={$dailyGoal}/>
        <CalenderStats />
    </div>
    <div class="justify-items-center w-full h-48">
        <Button a href="/ingame/{$defaultList}" class="k-color-main-green  max-w-[60vw] h-[6vh] m-auto my-8 text-xl">
            Start
        </Button>

        <Button a href="/lists"  outline class="k-color-main-green max-w-[60vw] h-[6vh] m-auto my-8 outline-4 text-xl">
            Lists
        </Button>
    </div>

</Page>

<style>
</style>
