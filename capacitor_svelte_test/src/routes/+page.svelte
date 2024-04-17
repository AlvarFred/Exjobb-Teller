<script>
    import {
      Page,
      Button
    } from 'konsta/svelte'

</script>

<Page>
    <div class="flex items-center justify-center h-64">
        <Button a href="/ingame" class="k-color-light-blue drop-shadow-[0px_4px_8px_black] mx-[5px] w-[60vw]">
            Start
        </Button>
    </div>

    <div class="grid grid-cols-2 gap-x-6 absolute bottom-0 w-full h-32">
        <Button a href="/ingame" class="k-color-light-blue drop-shadow-[0px_4px_8px_black] mx-[5px] w-[35vw]">
            Home
        </Button>

        <Button a href="/ingame" class="k-color-light-blue drop-shadow-[0px_4px_8px_black] mx-[5px] w-[35vw]">
            Lists
        </Button>
    </div>

</Page>

<style>
</style>
