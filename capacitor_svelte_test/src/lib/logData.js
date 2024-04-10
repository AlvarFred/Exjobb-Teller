import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export async function logData(dataToStore) {
    try{
        // This will save the file to 'data/data/com.example.app/files/data.json'
        await Filesystem.writeFile({
            path: 'data.json',
            data: dataToStore,
            directory: Directory.Data,
            encoding: Encoding.UTF8
        });
    }
    catch (e) {
        console.log("##################\n", "ERROR ERROR ERROR")
        console.error(e)
    }
};