import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import SubscriptionForm from './components/SubscriptionForm'
import theme from './utils/theme'

const GlobalStyle = createGlobalStyle`
  /* latin */
  @font-face {
    font-family: 'Mountains of Christmas';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Mountains of Christmas Regular'), local('MountainsofChristmas-Regular'), url(https://fonts.gstatic.com/s/mountainsofchristmas/v12/3y9w6a4zcCnn5X0FDyrKi2ZRUBIy8uxoUo7eDNGsMQ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin */
  @font-face {
    font-family: 'Mountains of Christmas';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Mountains of Christmas Bold'), local('MountainsofChristmas-Bold'), url(https://fonts.gstatic.com/s/mountainsofchristmas/v12/3y9z6a4zcCnn5X0FDyrKi2ZRUBIy8uxoUo7eBGqJJPxIOw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  * {
    font-family: Mountains of Christmas, cursive;
  }
  *, *:before, *:after {
    box-sizing: border-box
  }

  body {
    padding: ${theme.space[0]};
    margin: ${theme.space[0]};
    color: ${theme.colors.black};
    background-color: ${theme.colors.green};
  }
`

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SubscriptionForm />
    </ThemeProvider>
  )
}
