import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Theme {
        basket: {
            odd: string;
            even: string;
        };
    }

    // createTheme
    interface ThemeOptions {
        basket: {
            odd: string;
            even: string;
        };
    }
}

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
    basket: {
        odd: "#000",
        even: "#111",
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: { default: "#eee" },
    },
    basket: {
        odd: "#ccc",
        even: "#fff",
    },
});
