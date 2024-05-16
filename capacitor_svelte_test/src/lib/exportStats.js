import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

export async function exportStats() {
    const file = await Filesystem.getUri({
        directory: Directory.Documents,
        path: 'data.json'
    });

    const res = await Filesystem.stat({
        directory: Directory.Data,
        path: 'data.json'
    });

    console.log("##### Result: ", res.uri)
    console.log("##### Result: ", res.type)
    console.log("##### Result: ", res.size)


    console.log("######## FOUND: ", file.uri )

    // Share log data
    await Share.share({
        title: 'Share test data',
        text: 'Here is log data',
        url: file.uri,
        dialogTitle: 'Share test data'
    });
}