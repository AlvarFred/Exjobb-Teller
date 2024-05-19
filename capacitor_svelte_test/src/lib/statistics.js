import { Preferences } from '@capacitor/preferences';
import { getWeekNumber, getWeekDay } from './week';

export const increaseStats = async () => {
	const today = new Date();
	const year = today.getFullYear();
	let weekdata = JSON.parse((await Preferences.get({ key: `statistics${year}` })).value);

	weekdata[getWeekNumber(today) - 1].days[getWeekDay(today)]++;

	await Preferences.set({ key: `statistics${year}`, value: JSON.stringify(weekdata) });
};

export const checkIfUserReceivedStar = async () => {
    const today = new Date();
	const year = today.getFullYear();
	let weekdata = JSON.parse((await Preferences.get({ key: `statistics${year}` })).value);
    
    if(weekdata[getWeekNumber(today) - 1].days[getWeekDay(today)] > 0){
        return true;
    }
    return false;
}