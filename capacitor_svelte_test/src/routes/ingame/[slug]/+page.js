import { error } from '@sveltejs/kit';

export async function load({params}){
    try{

        const jonsfile = await import(`../lists/${params.slug}.json`)
        console.log(jonsfile);
        return {
            list: jonsfile.default
        }
    } catch(e){
        console.log(e)
        error(404, 'Not Found')
    }
}