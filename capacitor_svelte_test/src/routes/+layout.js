import { Preferences } from '@capacitor/preferences';
import { LocalNotifications } from '@capacitor/local-notifications';

export const prerender = false;
export const ssr = false;

export async function load() {
    const {value} = await Preferences.get({ key: "notificationsEnabled"});
    if (value === null) {
        // Enable notifications if needed 
        const permission = await LocalNotifications.checkPermissions();
        if(permission.display != 'granted'){
            const responsStatus =  (await LocalNotifications.requestPermissions()).display
            if(responsStatus != 'granted'){
               console.log("Scheduling of notification not granted")
               await Preferences.set({
                key: "notificationsEnabled",
                value: "false"
            })
            }
        }
        // Enable notifications and save the setting
        if(await scheduleNotification(13,0)){
            await Preferences.set({
                        key: "notificationsEnabled",
                        value: "true"
                    })
        } else{
           console.log("Scheduling of notification failed")
        }       
    }
    //await disableNotifications()
}

const scheduleNotification = async (hour, minute) => {
    const options = {
        notifications: [
            {
                title: "Test title",
                body: "Body of the notification",
                id: 1,
                schedule: {
                    allowWhileIdle: true,
                    on:{
                        hour: hour,
                        minute: minute
                    }
                }
            }
        ]
    }
    try{
        const result = (await LocalNotifications.schedule(options)).notifications
        console.log("\nWWWWWWWWWWWW Notifications:\n", result[0], "\nWWWWWWWWWWWWWWWWW\n ")
        return result.length > 0

    } catch(e){
        console.log(e)
        return false
    }
}

const disableNotifications = async () => {
    const options = {
        notifications: [
            {
                id: 1
            }
        ]
    }
    LocalNotifications.cancel(options)
    await Preferences.set({
        key: "notificationsEnabled",
        value: null
    })
}