<script>
	import { Block, BlockTitle, Card, Navbar, NavbarBackLink, Page } from "konsta/svelte";

    const lists = [{
        name: "Self love",
        completed: 2
    },{
        name: "I'm the best",
        completed: 0

    },{
        name: "My own Boss",
        completed: 72

    },{
        name: "I am the one",
        completed: 8

    },]


</script>

<Page>
    <Navbar transparent>
		<NavbarBackLink slot="left" text="Back" onClick={() => history.back()} />
	</Navbar>
    <BlockTitle large class="text-black mt-[0px] mx-[10px]">Affirmation lists</BlockTitle>
    <Block class="">
        {#each lists as list}
               <Card raised>
                <h2 class="text-lg">{list.name}</h2>
                <p class="text-xs">Completed {list.completed} times</p>
               </Card>
        {/each } 
    </Block>
</Page>
