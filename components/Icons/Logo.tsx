import { memo } from 'react'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'

const Logo = () => {
  const router = useRouter();
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
      onClick = {() => { router.replace('/contact') }}
    />
  )
}

export default memo(Logo)