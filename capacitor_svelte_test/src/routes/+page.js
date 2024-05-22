import { Preferences } from '@capacitor/preferences';
import { getWeekNumber, getWeekDay, generateWeekData } from '$lib/week';
import {defaultList} from '$lib/defaultList';
import {receivedStar} from '$lib/statistics.js';

export async function load() {
	const list = (await Preferences.get({ key: 'defaultList' })).value;
	console.log('in layout', list);
	if (!list) {
		await Preferences.set({ key: 'defaultList', value: 'tidy_home' });
		defaultList.set('tidy_home');
	} else {
		defaultList.set(list);
	}

	const today = new Date();
	const year = today.getFullYear();
	let weeks;
	const weekdata = (await Preferences.get({ key: `statistics${year}` })).value;
	if (weekdata) {
		weeks = JSON.parse(weekdata);
	} else {
		//generate weeks for year
		weeks = generateWeekData(today)
		await Preferences.set({ key: `statistics${year}`, value: JSON.stringify(weeks) });
	}

	const currentWeekNo = getWeekNumber(today);
	let pastFourWeeks;

	if (currentWeekNo < 4) {
		// Get weeks from last year
	}

	pastFourWeeks = [
		weeks[currentWeekNo - 4],
		weeks[currentWeekNo - 3],
		weeks[currentWeekNo - 2],
		weeks[currentWeekNo - 1]
	];
    
	receivedStar.set(pastFourWeeks[3].days[getWeekDay(today)] > 0)
    return {
		weeks: pastFourWeeks,
		weekday: getWeekDay(today)
	};
}
