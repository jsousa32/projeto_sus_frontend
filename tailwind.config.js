/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                primary: "#2754a7",
                secondary: "#0a1f46",
                disabled: "#979899"
            }
        },
    },
    screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }
        md: "768px",
        // => @media (min-width: 768px) { ... }
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
        xl: "1366px",
        // => @media (min-width: 1366px) { ... }
        "2xl": "1558px",
        // => @media (min-width: 1536px) { ... }
    },
    plugins: [],
};
