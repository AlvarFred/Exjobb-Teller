<script>
	import { Block, BlockTitle, Card, Navbar, NavbarBackLink, Page } from "konsta/svelte";
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
    <BlockTitle large class="text-black mt-[0px] mx-[10px]">Affirmation lists</BlockTitle>
    <Block class="grid grid-cols-2">
        {#each lists as list}
                <div class="drop-shadow-xl flex justify-center items-center m-[10px] rounded-lg text-center h-[20vh]" style="background-image: url({list.image}); background-size: cover; background-repeat: no-repeat;">
                    
                    <!-- <img class="h-[50%] " alt="Preview for lists" src={list.image}/> -->
                    
                    <p class="text-white text-2xl text-shadow">{list.name}</p>
                </div>
        {/each } 
    </Block>
</Page>

<style>
    .text-shadow{
		/* offset-x | offset-y | blur-radius | color */
		text-shadow: 0px 0px 4px black;
	}
</style>