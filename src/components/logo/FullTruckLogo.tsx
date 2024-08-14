import Box from '@mui/material/Box'
import { FC } from 'react'
import useResizeHandler from '../../hook/useResizeHandler'

type Props = {
  onClick?: () => void
}

const FullTruckLogo: FC<Props> = ({ onClick }) => {
  const { isMobile } = useResizeHandler();

  return (
    <Box
      component="img"
      sx={{
        height: isMobile ? 28 : 32,
        width: isMobile ? 240 : 260,
        '&:hover': {
          cursor: onClick ? 'pointer' : 'default',
        },
      }}
      alt="The FullTruck logo"
      src={'./logo.png'}
      onClick={onClick}
    />
  )
}

export default FullTruckLogo
