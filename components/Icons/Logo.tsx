import { memo } from 'react'
import { Box } from '@mui/material'

const Logo = () => {
  return (
    <Box
      component="i"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: 'url("/ram-logo.png")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: 106,
        height: 72,
      }}
    />
  )
}

export default memo(Logo)