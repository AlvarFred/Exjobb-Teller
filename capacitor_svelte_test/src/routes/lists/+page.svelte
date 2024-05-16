<script>
	import { Block, BlockTitle, Card, Navbar, NavbarBackLink, Page, Button } from "konsta/svelte";

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


</script>

<Page>
    <Navbar transparent>
		<NavbarBackLink slot="left" text="Back" onClick={() => window.location = '/'} />
	</Navbar>
    <BlockTitle large class="text-black mt-[0px] mx-[10px]">Affirmation lists</BlockTitle>
    <Block class="">
        {#each lists as list}
               <Card raised class="">
                    <div class="flex flex-row justify-between">
                        <div>
                            <h2 class="text-lg">{list.name}</h2>
                            <p class="text-xs">Completed {list.completed} times</p>
                        </div>
                        <Button tonal a href="/ingame/{list.path}" class="w-[20%]">Play</Button>
                    </div>
               </Card>
        {/each } 
    </Block>
</Page>
