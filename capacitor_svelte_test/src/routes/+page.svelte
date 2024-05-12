<script>
    import {
      Page,
      Button
    } from 'konsta/svelte'
    import {defaultList} from '$lib/defaultList'
	import CircularChart from './CircularChart.svelte';
	import CalenderStats from './CalenderStats.svelte';
	let percentage = 25;

</script>

<Page>
    <div class="flex items-center justify-center h-[60vh]">
        <CircularChart color={"#8BC34A"} percentage={percentage}/>
    </div>
    <CalenderStats />
    <div class="justify-items-center w-full h-48">
        <Button a href="/ingame/{$defaultList}" class="k-color-light-blue max-w-[60vw] h-[6vh] m-auto my-8">
            Start
        </Button>

        <Button a href="/lists" class="k-color-light-blue max-w-[60vw] h-[6vh] m-auto my-8">
            Lists
        </Button>
        <Button a href="/settings" class="k-color-light-blue max-w-[60vw] h-[6vh] m-auto my-8">
            Settings
        </Button>
    </div>

</Page>

<style>
</style>
