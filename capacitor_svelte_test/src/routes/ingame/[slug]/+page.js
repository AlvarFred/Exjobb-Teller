import { error } from '@sveltejs/kit';

export async function load({params}){
    try{
        const jsonList = await import(`../lists/${params.slug}.json`);
        
        // Shuffle images
        for(let i = jsonList.img.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [jsonList.img[i], jsonList.img[j]] = [jsonList.img[j], jsonList.img[i]];
        }
        console.log(jsonList);

        return {
            list: jsonList.default
        }
    } catch(e){
        console.log(e)
        error(404, 'Not Found')
    }
}
