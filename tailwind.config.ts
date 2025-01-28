import type { Config } from "tailwindcss";

export default {
    content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                expand: "all 2s ease",
            },
            colors: {
                accent: "#ffd500",
                background: "#1b1b1b",
            },
        },
    },
} satisfies Config;
