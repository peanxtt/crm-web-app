import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'


// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: [
      "Noto Sans SC",
      "sans-serif",
    ].join(','),
    fontWeightRegular: 400,
    h5: {
      fontSize: 24,
      lineHeight: '41px',
      fontWeight: 700,
    },
    caption: {
      fontSize: 14,
    },
    button: {
      fontSize: 24,
    }
  },
  palette: {
    primary: {
      main: '#C4955A',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme