import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export async function logData(dataToStore, file_to_write) {
    try{
        let arrLogData = []
        let result = await Filesystem.readFile({
            path: file_to_write,
            directory: Directory.Documents,
            encoding: Encoding.UTF8
        })

        // Check if file exists or has any data, if true add previous data to array
        // Parse all data being added so we don't need to parse it when extracting it later
        if(result.data.length > 0){
            arrLogData.push(JSON.parse(result.data))
        }
        arrLogData.push(JSON.parse(dataToStore))
        console.log("################## RESULT ARRAY: ", arrLogData)

        // This will save the file to 'data/data/com.example.app/files/[file_to_write]'
        await Filesystem.writeFile({
            path: file_to_write,
            data: JSON.stringify(arrLogData),
            directory: Directory.Documents,
            encoding: Encoding.UTF8
        });
    }
    catch (e) {
        // If file hasn't been created, create it and move on
        if(e == "Error: File does not exist"){
            await Filesystem.writeFile({
                path: file_to_write,
                data: dataToStore,
                directory: Directory.Documents,
                encoding: Encoding.UTF8
            });

            console.log("######## Created file: ", file_to_write);
            return;
        }

        console.log("##################\n", "ERROR ERROR ERROR")
        console.error(e)
    }
};