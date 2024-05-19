import { Preferences } from '@capacitor/preferences';
import { LocalNotifications } from '@capacitor/local-notifications';
import { scheduleNotification } from '$lib/notifications';
import { dailyGoal } from '$lib/dailyGoal';


export const prerender = false;
export const ssr = false;

const defaultHour = 13;
const defaultMinute = 30;

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
        if(await scheduleNotification(defaultHour,defaultMinute)){
            await Preferences.set({
                        key: "notificationsEnabled",
                        value: "true"
                    })
            await Preferences.set({key: "notificationHour", value: defaultHour.toString()})
            await Preferences.set({key: "notificationMinute", value: defaultMinute.toString()})

        } else{
           console.log("Scheduling of notification failed")
        }       
    }
    try{
         const {savedGoal} = await Preferences.get({ key: "dailyGoal"});
    if (!savedGoal){
        await Preferences.set({key: "dailyGoal", value: "3"})
        dailyGoal.set(3);
        return
    }
    dailyGoal.set(parseInt(savedGoal));
    } catch(e){
        console.log(e);
    }
   

}
