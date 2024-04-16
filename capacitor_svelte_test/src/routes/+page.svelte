<script>
    import {
      Page,
      Button
    } from 'konsta/svelte'

</script>

<Page>
    <div class="flex justify-items-center">
        <Button a href="/ingame" class="k-color-light-blue drop-shadow-[0px_4px_8px_black] mx-[5px] w-[40vw]">
            Start
        </Button>
    </div>

    <div class="grid grid-cols-2 gap-x-4 justify-items-center absolute bottom-0 w-full">
        <Button a href="/ingame" class="k-color-light-blue drop-shadow-[0px_4px_8px_black] mx-[5px] w-[40vw]">
            Home
        </Button>

        <Button a href="/ingame" class="k-color-light-blue drop-shadow-[0px_4px_8px_black] mx-[5px] w-[40vw]">
            Lists
        </Button>
    </div>

</Page>

<style>
</style>
