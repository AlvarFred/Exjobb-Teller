import { Preferences } from '@capacitor/preferences';

export  const load = async () => {
    try{
        const enabled = (await Preferences.get({ key: "notificationsEnabled"})).value;
        const hour = (await Preferences.get({key: "notificationHour"})).value
        const minute = (await Preferences.get({key: "notificationMinute"})).value
        console.log('FROM SETTINGS LOAD: ENABLED: ',enabled, ' HOUR: ', hour, ' MINUTE: ', minute)
        return {
            enabled: enabled,
            time: hour + ':' + minute
        }

    } catch(e){
        console.log(e)
    }
}