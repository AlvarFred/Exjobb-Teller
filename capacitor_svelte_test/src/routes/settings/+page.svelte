<script>
	import { Block, BlockTitle, ListInput, Navbar, NavbarBackLink, Page, Toggle } from 'konsta/svelte';

    let notificationsEnabled = true;
    const toggleNotifications = () => {
        notificationsEnabled = !notificationsEnabled
    }
</script>
<Page>
    <Navbar title="Settings">
        <NavbarBackLink slot="left" text="Back" onClick={() => history.back()} />
    </Navbar>
    <BlockTitle>Notifications</BlockTitle>
    <Block>
        <input type="number" pattern="[0-9]*"/>
        <ListInput type="number"></ListInput>
        <Toggle checked={notificationsEnabled} onChange={toggleNotifications}/>
    </Block>
</Page>