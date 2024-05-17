<script>
	import { Block, BlockTitle, Card, Navbar, NavbarBackLink, Page, Button } from "konsta/svelte";
	import StarSvg from "../starSvg.svelte";
    import {defaultList} from '$lib/defaultList';

    const lists = [{
        name: "Test list",
        path: "list1",
        completed: 2
    },{
        name: "Programming",
        path: "programming",
        completed: 0

    },{
        name: "Tidy Home",
        path: "tidy_home",
        completed: 72

    },{
        name: "Workout",
        path: "workout",
        completed: 8

    },]

    const setDefault = (list) => {
        if($defaultList == list) return;
        defaultList.set(list)
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
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque hic labore dolores.  </p>
                        </div>
                        <div class="flex flex-col justify-between items-end">
                            <button on:click={()=> setDefault(list.path)}> 
                                <StarSvg completed={list.path == $defaultList} width=30 height=30/>
                            </button>
                            <Button  a href="/ingame/{list.path}" class=" k-color-primary-green ">Start</Button>

                        </div>
                    </div>
               </Card>
        {/each } 
    </Block>
</Page>
