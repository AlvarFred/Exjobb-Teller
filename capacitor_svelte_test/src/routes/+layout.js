import { Preferences } from '@capacitor/preferences';
import { LocalNotifications } from '@capacitor/local-notifications';

export const prerender = false;
export const ssr = false;

export async function load() {
    const {value} = await Preferences.get({ key: "notificationsEnabled"});
    if (value === null || true) {
        // Enable notifactions 
        const enable = await LocalNotifications.checkPermissions();
        if(enable.display != 'granted' || true){
            const responsStatus =  (await LocalNotifications.requestPermissions()).display
            if(responsStatus == 'granted'){
                if(await scheduleNotification()){
                    await Preferences.set({
                                key: "notificationsEnabled",
                                value: "true"
                            })
                } else{
                   console.log("Scheduling of notification failed")
                }
            }
        }
        console.log('#¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤#\n',enable.display, '\n#¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤#')
       
    }
    console.log('#¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤#')
    console.log(value);
    console.log('#¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤##¤#¤#')
    await disableNotifications()
}

const scheduleNotification = async () => {
    const options = {
        notifications: [
            {
                title: "Test title",
                body: "Body of the notification",
                id: 1,
                schedule: {
                    allowWhileIdle: true,
                    on:{
                        second: 30
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