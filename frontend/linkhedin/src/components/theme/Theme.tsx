import { createContext } from "react";

export const THEME = {
    light: {
        className: ".light"
    },
    dark: {
        className: ".dark"
    }
}

export const ThemeContext = createContext(THEME.light)