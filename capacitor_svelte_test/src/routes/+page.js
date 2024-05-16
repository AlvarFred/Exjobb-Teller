import { Preferences } from '@capacitor/preferences';
import { getWeekNumber, weeksInYear, getWeekDay } from '$lib/week';

export async function load() {
	const today = new Date();
	const year = today.getFullYear();
	let weeks;
	const weekdata = (await Preferences.get({ key: `statistics${year}` })).value;
	if (weekdata) {
		weeks = JSON.parse(weekdata);
	} else {
		//generate weeks for year
		const nrOfWeeks = weeksInYear(today.getFullYear());
		weeks = [];
		let week;
		for (let i = 0; i < nrOfWeeks; i++) {
			week = {
				number: i + 1,
				days: [0, 0, 0, 0, 0, 0, 0]
			};
			weeks.push(week);
		}
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

	return {
		weeks: pastFourWeeks,
		weekday: getWeekDay(today)
	};
}
