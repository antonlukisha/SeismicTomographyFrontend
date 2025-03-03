import { Box } from '@mui/joy'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { ruRU } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React from 'react'

export const DateInput = () => {
    return (
        <LocalizationProvider
            localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            dateAdapter={AdapterDayjs}
        >
            <Box display='grid' gap={2}>
                <Box className="date-picker">
                    <DateTimePicker
                        name='start_time'
                        label="Время начала"
                    />
                </Box>
                <Box className="date-picker">
                    <DateTimePicker
                        name='end_time'
                        label="Время окончания"
                    />
                </Box>
            </Box>
        </LocalizationProvider>
    )
}
