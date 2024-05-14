<script>
	import StarSvg from "./starSvg.svelte";


    let weeks = 
    [
        {
            number: 2,
            completed: [0,1,2,0,0,1,1]
        },
        {
            number: 3,
            completed: [0,0,2,1,0,1,1]
        },
        {
            number: 4,
            completed: [1,1,2,1,1,1,1]
        },
        {
            number: 5,
            completed: [0,1,,0,0,1,0]
        }
    ]

        const style = "font-mono font-normal"
</script>

<table class="w-[70vw] text-center bg-[#EEEEEE] border-spacing-3 border-separate rounded-lg">
    <thead>
        <tr>
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
        {#each weeks as week }
            <tr>
                <td class="">{week.number}</td>
                {#each week.completed as day }
                    <td>
                        <StarSvg completed={day > 0}/>
                    </td>
                {/each}
            </tr>
        {/each}
        
    </tbody>
</table>