/** @type {import('tailwindcss').Config} */
/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {nextui} = require("@nextui-org/react")

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Open Sans", "sans-serif"],
            },
        },
    },
    darkMode: "class",
    plugins: [nextui({
        themes: {
            light: {
                colors: {
                    
                }
            },
            dark: {
                colors: {
                    
                }
            },
        }
    })]
}

