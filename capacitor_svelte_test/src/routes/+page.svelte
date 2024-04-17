<script>
    import {
      Page,
      Button
    } from 'konsta/svelte'

</script>

<Page>
    <div class="flex items-center justify-center h-[70vh]">
        <!-- Streak/Statistics here -->
        <div class="flex justify-center rounded-full bg-orange-400 w-[62vw] h-[62vw]"> 
            <p class="m-auto text-[3rem]">
                42 
            </p>
        </div>
    </div>
    
    <div class="justify-items-center w-full h-48">
        <Button a href="/ingame" class="k-color-light-blue w-[70vw] h-[6vh] m-auto my-8">
            Start
        </Button>

        <Button a href="/ingame" class="k-color-light-blue w-[70vw] h-[6vh] m-auto my-8">
            Lists
        </Button>
    </div>

</Page>

<style>
</style>
