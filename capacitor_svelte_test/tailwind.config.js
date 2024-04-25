/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {    
            keyframes:{
                bounce:{
                    '0%': {
                        transform: 'translateY(0)'
                    },
                    '50%':{
                        transform: 'translateY(-20px)'
                    },
                    '100%':{
                        transform: 'translateY(0)'
                    }
                }
            },
            animation:{
                'mic-bounce': 'bounce 1.5s ease-in infinte'
            }
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
			'light-blue': '#92D6F8'
		}
	},
	theme: {
		extend: {
            keyframes:{
                pulse:{
                    '0%': {
                        width: '20vw', 
                        height: '20vw',
                        opacity: 1,
                        outline: '3px solid #92D6F8'
                    },
                    '50%':{
                        width: '20vw', 
                        height: '20vw',
                        opacity: 1,
                        outline: '14px solid rgba(146, 214, 248, 0.6)'
                    },
                    '100%':{
                        width: '20vw', 
                        height: '20vw',
                        opacity: 1,
                        outline: '3px solid rgba(146, 214, 248, 0.9)'
                    }
                },
                bounce:{
                    '0%': {
                        transform: 'translateY(0)',
                        //transform: 'scale(1)'
                    },
                    '50%':{
                        transform: 'translateY(-20px)'
                    },
                    '100%':{
                        transform: 'translateY(0)'
                        //transform: 'scale(2)'
                    }
                }
            },
            animation:{
                'mic-pulse': 'pulse 1.2s infinite',
                'mic-bounce': 'bounce 1.5s infinte'
            }
        }
	},
	variants: {
		extend: {}
	},
	plugins: []
});
