<script>
	import { Card, Navbar, NavbarBackLink, Page } from "konsta/svelte";
    import NatureImg1 from '$lib/assets/nature.jpg'
    import NatureImg2 from '$lib/assets/nature2.jpeg'
    const lists = [{
        name: "Self love",
        image: NatureImg1
    },{
        name: "I'm the best",
        image: NatureImg2
    },{
        name: "My own Boss",
        image: NatureImg1
    },{
        name: "I am the one",
        image: NatureImg2
    },]


</script>

<Page>
    <Navbar transparent>
		<NavbarBackLink slot="left" text="Back" onClick={() => history.back()} />
	</Navbar>
    <div class="grid grid-cols-2">

        {#each lists as list}
                <Card class="p-0">
                    
                        <img class="h-[50%]" slot="header" alt="Preview for lists" src={list.image}/>
                    
                    <p class="">{list.name}</p>
                </Card>
        {/each } 
    </div>
</Page>