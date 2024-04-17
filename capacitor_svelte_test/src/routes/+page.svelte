<script>
	import { Camera } from '@capacitor/camera';
  import {
    Page,
    Button
  } from 'konsta/svelte'
	const takePhoto = async ()=>{
		try {
          const photo = await Camera.getPhoto({
            resultType: 'uri',
          });

          const image = self.shadowRoot.querySelector('#image');
          if (!image) {
            return;
          }

          image.src = photo.webPath;
        } catch (e) {
          console.warn('User cancelled', e);
        }
	}
</script>
<Page>

  <h1>HEJ</h1>
  <a href="/ingame"><Button>Start</Button></a>
  <a href="/lists"><Button>list</Button></a>
</Page>


<style>
	
</style>
