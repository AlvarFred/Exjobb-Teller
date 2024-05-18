import { writable } from "svelte/store";
import { Preferences } from '@capacitor/preferences';

export const defaultList = writable("list1");

defaultList.subscribe((value) => {
	console.log(value);
}); 

export const saveDefaultList = (list) => {
    Preferences.set({key: "defaultList", value: list})
}