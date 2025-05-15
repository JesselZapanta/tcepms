import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
        keyframes: {
            "fade-in": {
                "0%": { opacity: "0" },
                "100%": { opacity: "1" },
            },
        },
        animation: {
            "fade-in": "fade-in 1s ease-out forwards",
        },
    },

    plugins: [forms],
};
