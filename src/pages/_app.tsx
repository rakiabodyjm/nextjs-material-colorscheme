import { Box, CssBaseline, Switch, Theme, Typography, useMediaQuery } from '@material-ui/core'
import { ThemeProvider, useTheme, withStyles } from '@material-ui/styles'
import { User } from '@src/api/userApi'
import themeCreator from '@src/theme'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import 'styles/globals.css'

/**
 * Best to put this in separate layout container
 */
function MyApp({
  Component,
  pageProps,
  colorScheme,
  toggleColorScheme,
}: AppProps & { toggleColorScheme: () => void; colorScheme: 'light' | 'dark' }) {
  const [users, setUsers] = useState<User[]>([])
  const theme: Theme = useTheme()
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_HOST

  return (
    <>
      <div
        style={{
          background: theme.palette.primary.main,
          padding: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing(4),
        }}
      >
        <div>
          <Typography variant="body1">Practice Problem</Typography>
        </div>
        <Box display="flex" alignItems="center">
          <Typography variant="h6">
            Color Scheme: <Typography component="span">{colorScheme}</Typography>
          </Typography>
          <Switch
            onChange={() => {
              toggleColorScheme()
            }}
          />
        </Box>
      </div>

      <Component {...pageProps} />
    </>
  )
}

export default function StyledApp(appProps: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  /**
   * get device color scheme
   */
  useEffect(() => {
    if (prefersDark) {
      setIsDarkMode(prefersDark)
    }
  }, [prefersDark])

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <ThemeProvider
      theme={themeCreator({
        prefersDarkMode: isDarkMode,
      })}
    >
      <CssBaseline />
      <MyApp
        toggleColorScheme={() => {
          setIsDarkMode((prevState) => !prevState)
        }}
        colorScheme={isDarkMode ? 'dark' : 'light'}
        {...appProps}
      />
    </ThemeProvider>
  )
}
