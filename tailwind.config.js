/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: '#091d30',
                    dark: '#061525',
                    light: '#0d2943',
                },
                gold: {
                    DEFAULT: '#bc934a',
                    light: '#d4a865',
                    dark: '#a37f3e',
                },
                ivory: {
                    DEFAULT: '#F7F5F0',
                    light: '#FDFCFA',
                    dark: '#EDE9E0',
                },
                text: {
                    primary: '#222222',
                    secondary: '#444444',
                },
                accent: {
                    red: '#B31B1B',
                },
            },
            fontFamily: {
                serif: ['Playfair Display', 'Merriweather', 'serif'],
                sans: ['Open Sans', 'Inter', 'sans-serif'],
                accent: ['Montserrat', 'Poppins', 'sans-serif'],
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            fontSize: {
                'hero': '72px',
                'heading': '36px',
                'body': '18px',
                'small': '14px',
            },
            lineHeight: {
                'relaxed-custom': '1.7',
            },
        },
    },
    plugins: [],
}