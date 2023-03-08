import { memo } from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew';

const Sync = ({ size = 28 }) => {
  return (
    <AutorenewIcon
      sx={{
        width: size,
        height: size,
        animation: "spin 2s linear infinite",
        "@keyframes spin": {
          "0%": {
            transform: "rotate(0deg)"
          },
          "100%": {
            transform: "rotate(360deg)"
          }
        }
      }}
    />
  )
}

export default memo(Sync)