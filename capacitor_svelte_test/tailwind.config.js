/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
            
        }
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
			'light-blue': '#92D6F8',
            'brand-red': '#ff0000',
		}
	},
	theme: {
		extend: {
            keyframes:{
                pulse:{
                    '0%': {
                        opacity: 1,
                        outline: '0px solid rgba(220, 38, 38, 0.9)',
                    },
                    '50%':{
                        opacity: 1,
                        outline: '12px solid rgba(220, 38, 38, 0.6)'
                    },
                    '100%':{
                        opacity: 1,
                        outline: '0px solid rgba(220, 38, 38, 0.9)'
                    }
                },
                pulse_reverse:{
                    '0%': {
                        opacity: 1,
                        outline: '12px solid rgba(220, 38, 38, 0.6)'
                    },
                    '100%':{
                        opacity: 1,
                        outline: '0px solid rgba(220, 38, 38, 0.9)'
                    }
                }
            },
            animation:{
                'mic-pulse': 'pulse 1.2s ease-in-out infinite',
                'mic-retract': 'pulse_reverse 0.6s ease-in'
            }
        }
	},
	variants: {
		extend: {}
	},
	plugins: []
});
