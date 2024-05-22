export const getWeekDay = (date) => {
	if (date.getDay() == 0) return 6;
	else return date.getDay() - 1;
};

export const getWeekNumber = (d) => {
	// Copy date so don't modify original
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	// Get first day of year
	let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	// Calculate full weeks to nearest Thursday
	let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	// Return array of year and week number
	return weekNo;
};

export const weeksInYear = (year) => {
	let d = new Date(year, 11, 31);
	let week = getWeekNumber(d);
	return week == 1 ? 52 : week;
};

export const generateWeekData = (date) => {
	const nrOfWeeks = weeksInYear(date.getFullYear());
		let weeks = [];
		let week;
		for (let i = 0; i < nrOfWeeks; i++) {
			week = {
				number: i + 1,
				days: [0, 0, 0, 0, 0, 0, 0]
			};
			weeks.push(week);
		}
		return weeks;
}