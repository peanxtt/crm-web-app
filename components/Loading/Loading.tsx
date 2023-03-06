import { Box } from '@mui/material'
import Logo from '../Icons/Logo'

const Loading = () => {
  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Logo />
    </Box>
  )
}

export default Loading