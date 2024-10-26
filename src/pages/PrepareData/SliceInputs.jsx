import { Box, Input } from '@mui/joy'
import React from 'react'

export const SliceInputs = () => {

    return (
        <Box display={'grid'} gridTemplateAreas={'1fr 1fr 2fr 2fr'}>
            <Input
                type='number'
                placeholder='От'
                onChange={(event) => setMin(Number(event.target.value))}
                slotProps={{
                    input: {
                        required: true,
                        step: 0.5,
                    },
                }}
                name=''
            />
            <Input
                type='number'
                placeholder='До'
                onChange={(event) => setMax(Number(event.target.value))}
                slotProps={{
                    input: {
                        required: true,
                        step: 0.5,
                    },
                }}
                name=''
            />
            <Input
                type='number'
                placeholder='VP'
                name=''
            />
            <Input
                type='number'
                placeholder='VS'
                name=''
            />
        </Box>
    )
}
