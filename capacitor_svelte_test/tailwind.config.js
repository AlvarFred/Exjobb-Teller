/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: []
};

// import konstaConfig config
const konstaConfig = require('konsta/config');
// wrap config with konstaConfig config
module.exports = konstaConfig({
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'selector', // or 'class'
	konsta: {
		colors: {
			'my-color': '#ff0000'
		}
	},
	theme: {
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
});
