import { writable } from "svelte/store";

export const defaultList = writable("list1");

defaultList.subscribe((value) => {
	console.log(value);
}); 