import { Preferences } from '@capacitor/preferences';
import { writable } from "svelte/store";
import { getWeekNumber, getWeekDay, generateWeekData } from './week';

export const receivedStar = writable(false); 

export const increaseStats = async () => {
    const today = new Date();
	const year = today.getFullYear();
	let weekdata = JSON.parse((await Preferences.get({ key: `statistics${year}` })).value);

	weekdata[getWeekNumber(today) - 1].days[getWeekDay(today)]++;

	await Preferences.set({ key: `statistics${year}`, value: JSON.stringify(weekdata) });
};

export const eraseData = async () => {
	const today = new Date();
	const year = today.getFullYear();
	const weeks = generateWeekData(today);
	try{
		await Preferences.set({ key: `statistics${year}`, value: JSON.stringify(weeks)});
	} catch (e) {
		console.log(e);
		throw e
	}
}