<script>
	export const prerender = true;
	import { Camera } from '@capacitor/camera';
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

<h1>HEJ</h1>
<button on:click={takePhoto}>Click</button>
<a href="/ingame">CLICK</a>


<style>
	
</style>
