// import { createTheme, responsiveFontSizes } from '@material-ui/core'
// import { responsiveFontSizes, createTheme } from '@mui/material/styles'

import { createTheme, responsiveFontSizes, Theme, ThemeOptions } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

type CustomThemeProperties = {
  prefersDarkMode: boolean
}

const theme = (additionalProps: CustomThemeProperties): Theme => {
  const { prefersDarkMode } = additionalProps
  const customTheme: ThemeOptions = {
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: '#ec5b2b',
      },
      secondary: {
        main: '#0F254C',
      },
      error: {
        main: red.A700,
      },
    },
    typography: {
      htmlFontSize: 16,
      fontSize: 14,
      fontFamily: [`Montserrat`, 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Oxygen'].join(
        ','
      ),
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            WebkitFontSmoothing: 'auto',
          },
        },
      },
      MuiButton: {
        root: {
          padding: `4px 16px`,
        },
      },
    },
  }
  return createTheme({
    ...customTheme,
  })
}

const themeCreator = (params: CustomThemeProperties) => responsiveFontSizes(theme(params))

export default themeCreator
