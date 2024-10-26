import { Box } from '@mui/joy'
import React from 'react'
import { EventsMap } from '../../components/EventsMap'
import { useLocation } from 'react-router-dom'


const Events = () => {
  
  const taskId = useLocation().pathname.split`/`.at(-1)

  return (
    <Box>
      <EventsMap />
    </Box>
  )
}

export default Events