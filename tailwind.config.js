/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#1E90FF',

					secondary: '#fff',

					accent: '#C148AC',

					neutral: '#7f7f7f',

					'base-100': '#F2F3F4',

					info: '#93E7FB',

					success: '#81CFD1',

					warning: '#EFD7BB',

					error: '#E58B8B',
				},
			},
		],
	},
	plugins: [
		require('daisyui'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
};
