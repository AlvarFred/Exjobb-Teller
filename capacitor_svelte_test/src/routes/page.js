import { Preferences } from '@capacitor/preferences';
import { getWeekNumber } from '../lib/statistics';
export async function load() {
	const today = new Date();
	const year = today.getFullYear();

	const { data } = await Preferences.get({ key: `statistics${year}` });
	if (!data) {
		//generate weeks for year
	}

	const weeks = JSON.parse(data);
	const currentWeekNo = getWeekNumber(today);
	let pastFourWeeks;

	if (currentWeekNo < 4) {
		// Get weeks from last year
	}

	pastFourWeeks = [
		weeks[currentWeekNo - 3],
		weeks[currentWeekNo - 2],
		weeks[currentWeekNo - 1],
		weeks[currentWeekNo]
	];

	return {
		weeks: pastFourWeeks
	};
}
