import { Preferences } from '@capacitor/preferences';
import { LocalNotifications } from '@capacitor/local-notifications';

export const prerender = true;
export const ssr = false;

export async function load() {
    const {value} = await Preferences.get({ key: "notificationsEnabled"});
    if (value === null) {
        // Enable notifactions 
        const enable = await LocalNotifications.checkPermissions();
        console.log(enable)
        await Preferences.set({
            key: "notificationsEnabled",
            value: true
        })
    }
    console.log(value);
}