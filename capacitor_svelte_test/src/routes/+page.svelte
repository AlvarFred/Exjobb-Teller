<script>
    import {
      Page,
      Button
    } from 'konsta/svelte'
    import {defaultList} from '$lib/defaultList'
	

</script>

<Page>
    <div class="flex items-center justify-center h-[70vh]">
        <!-- Streak/Statistics here -->
        <div class="flex flex-col justify-center items-center rounded-full bg-orange-400 w-[62vw] h-[62vw]"> 
            <p class="text-[3rem]">
                42 
            </p>
            <p class="text-[3rem]">
                days 
            </p>
        </div>
    </div>
    
    <div class="justify-items-center w-full h-48">
        <Button a href="/ingame/{$defaultList}" class="k-color-light-blue max-w-[60vw] h-[6vh] m-auto my-8">
            Start
        </Button>

        <Button a href="/lists" class="k-color-light-blue max-w-[60vw] h-[6vh] m-auto my-8">
            Lists
        </Button>
    </div>

</Page>

<style>
</style>
