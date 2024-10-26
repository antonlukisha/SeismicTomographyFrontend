import { Box, CssVarsProvider } from '@mui/joy'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { DataSlices } from './DataSlices'

const PrepareData = () => {

  const taskId = useLocation().pathname.split`/`.at(-1)

  

  return (
    <CssVarsProvider>
      <Box display={'flex'}>
        <DataSlices />
      </Box>
    </CssVarsProvider>
  )
}

export default PrepareData