import { LocalNotifications } from '@capacitor/local-notifications';

export const scheduleNotification = async (hour, minute) => {
	const options = {
		notifications: [
			{
				title: 'Teller',
				body: 'Remember to do your daily affirmations!',
				id: 1,
				schedule: {
					allowWhileIdle: true,
					on: {
						hour: hour,
						minute: minute,
						second: 0
					}
				}
			}
		]
	};
	try {
		const result = (await LocalNotifications.schedule(options)).notifications;
		return result.length > 0;
	} catch (e) {
		console.log(e);
		return false;
	}
};

export const disableNotifications = async () => {
	const options = {
		notifications: [
			{
				id: 1
			}
		]
	};
	try {
		await LocalNotifications.cancel(options);
		return true;
	} catch (e) {
		return false;
	}
};

export const rescheduleNotification = async (hour, minute) => {
	try {
		if (await disableNotifications()) {
			if (await scheduleNotification(hour, minute)) return true;
		}
		return false;
	} catch (e) {
		return false;
	}
};
