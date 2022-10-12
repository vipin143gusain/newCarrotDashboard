import { ThemeProvider } from '@mui/material';
import { StylesProvider } from '@mui/styles';
import { createContext, FC, useEffect, useState } from 'react';
import { themeCreator } from './base';

interface ThemeProviderProps {
  children?: any;
}
export const ThemeContext = createContext((_themeName: string): void => {});

const ThemeProviderWrapper: FC = (props: ThemeProviderProps) => {
  const { children } = props;
  const [themeName, _setThemeName] = useState('NebulaFighterTheme');

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || 'NebulaFighterTheme';
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    window.localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
