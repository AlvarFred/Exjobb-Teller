<script>
	import { Block, BlockTitle, Card, Navbar, NavbarBackLink, Page, Button } from "konsta/svelte";
	import StarSvg from "../starSvg.svelte";
    import {defaultList, saveDefaultList} from '$lib/defaultList';

    const lists = [{
        name: "Programming",
        path: "programming",
        description: "A list to improve your confidence and motivation in programming."

    },
    {
        name: "Programming 2",
        path: "programming2",
        description: "A list to improve your confidence and motivation in programming."
    },{
        name: "Tidy Home",
        path: "tidy_home",
        description: "A list to motivate you to keep your home a clean place"

    },{
        name: "Tidy Home 2",
        path: "tidy_home2",
        description: "A list to motivate you to keep your home a clean place"
    },{
        name: "Workout",
        path: "workout",
        description: "A list to motivate and bolster your physical health"
    },{
        name: "Workout 2",
        path: "workout2",
        description: "A list to motivate and bolster your physical health"
    }]

    const setDefault = (list) => {
        if($defaultList == list) return;
        defaultList.set(list)
        saveDefaultList(list)
    }
</script>

<Page>
    <Navbar transparent>
		<NavbarBackLink a href="/" slot="left" text="Back"  />
	</Navbar>
    <BlockTitle large class="k-color-primary-green mt-[0px] mx-[10px]">Affirmation lists</BlockTitle>
    <Block class="">
        {#each lists as list}
               <Card raised class="bg-surface">
                    <div class="flex flex-row justify-between">
                        <div>
                            <h2 class="text-lg">{list.name}</h2>
                            <p>{list.description} </p>
                        </div>
                        <div class="flex flex-col justify-between items-end">
                            <button on:click={()=> setDefault(list.path)}> 
                                <StarSvg completed={list.path == $defaultList} width=30 height=30/>
                            </button>
                            <Button  a href="/ingame/{list.path}" class=" k-color-primary-green mt-4">Start</Button>

                        </div>
                    </div>
               </Card>
        {/each } 
    </Block>
</Page>
