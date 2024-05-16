<script>
	import StarSvg from "./starSvg.svelte";
    export let weeks;
    export let today;
    console.log(weeks)

        const style = "font-mono font-normal w-[24px]"
</script>

<table class="w-[70vw] text-center bg-[#EEEEEE] border-spacing-3 border-separate rounded-lg">
    <thead>
        <tr  class="flex justify-between items-center">
            <th class={style}></th>
            <th class={style}>Mo</th>
            <th class={style}>Tu</th>
            <th class={style}>We</th>
            <th class={style}>Th</th>
            <th class={style}>Fr</th>
            <th class={style}>Sa</th>
            <th class={style}>Su</th>
        </tr>
    </thead>
    <tbody>
        {#each weeks as week, i }
            <tr class="flex justify-between items-center">
                <td class="w-[24px]">{week.number}</td>
                {#each week.days as day, j }
                    <td class="w-[24px] {i == 3 && today == j ? "today" : ""}">
                        <StarSvg completed={day > 0}/>
                    </td>
                {/each}
            </tr>
        {/each}
        
    </tbody>
</table>

<style>
    .today{
        
    }
</style>