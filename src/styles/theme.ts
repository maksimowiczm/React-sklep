import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Theme {
        basket: {
            odd: string;
            even: string;
        };
        adminIcons: {
            edit: string;
            delete: string;
        };
    }

    // createTheme
    interface ThemeOptions {
        basket: {
            odd: string;
            even: string;
        };
        adminIcons: {
            edit: string;
            delete: string;
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
    adminIcons: {
        edit: "#6D36CD",
        delete: "#F45B69",
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
    adminIcons: {
        edit: "#6D36CD",
        delete: "#F45B69",
    },
});
