import { extendTheme } from '@chakra-ui/react';

export const theme = {
  colors: {
    black: '#000',
    white: '#fff',
    green: '#00ce00',
    red: '#fb1a1a',
    text: '#2a2a2ab3',
    background: '#fff',
    backgroundSecondary: '#e0e4e8',
    backgroundForm: 'antiquewhite',
    borderColor: '#b8b2b2b3',
    primary: '#4299e1',
    secondary: '#fbd38d',
    accent: '#609',
    muted: '#f6f6f6',
  },
  space: [0, 2, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: {
    xs: '12px',
    s: '14px',
    m: '16px',
    l: '32px',
    xl: '64px',
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  borders: {
    none: 'none',
    normal: '1px solid',
  },
  radii: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '16px',
    round: '50%',
  },
};

const colors = {
  brand: {
    900: '#024fc9',
    800: '#146af5',
    700: '#2977f2',
    600: '#337df2',
    500: '#4287f5',
  },
};
const fonts = {
  body: 'Tahoma',
  heading: 'Courier New',
};

export const chakraThemePallets = extendTheme({
  colors,
  fonts,
});
