import { useCallback, useEffect, useMemo, useState } from 'react';

const THEME_STORAGE_KEY = 'theme';

const getInitialTheme = () => {
    if (typeof window === 'undefined') return false;

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === null) {
        return false;
    }

    return storedTheme === 'light';
};

const useTheme = () => {
    const [isLightTheme, setIsLightTheme] = useState(getInitialTheme);

    useEffect(() => {
        const themeValue = isLightTheme ? 'light' : 'dark';
        localStorage.setItem(THEME_STORAGE_KEY, themeValue);

        document.body.setAttribute('data-theme', themeValue);
        document.body.classList.toggle('theme-light', isLightTheme);
        document.body.classList.toggle('theme-dark', !isLightTheme);
    }, [isLightTheme]);

    const enable = useCallback(() => {
        setIsLightTheme(true);
    }, []);

    const disable = useCallback(() => {
        setIsLightTheme(false);
    }, []);

    const toggle = useCallback(() => {
        setIsLightTheme((prev) => !prev);
    }, []);

    return useMemo(() => ({
        value: isLightTheme,
        enable,
        disable,
        toggle,
    }), [disable, enable, isLightTheme, toggle]);
};

export default useTheme;
