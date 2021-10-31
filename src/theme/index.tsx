const baseSpacing = 2;
const theme = {
  colors: {
    background: '#f0f0f0',
    foreground: '#ffffff',
    primary: '#1f1f1f',
    secondary: '#a8a8a8',
    inactive: '#aaaaaa',
  },
  mediaQuery: {
    phone: '@media screen and (max-width: 600px)',
    tablet: '@media screen and (max-width: 1200px)',
  },
  spacing: {
    base: `${baseSpacing}rem`,
    xs: `${baseSpacing / 2}rem`,
    sm: `${baseSpacing}rem`,
    md: `${baseSpacing * 2}rem`,
    xl: `${baseSpacing * 3}rem`,
  },
};

export default theme;
