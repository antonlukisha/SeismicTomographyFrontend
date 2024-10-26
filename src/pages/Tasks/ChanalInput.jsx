import React, { useRef } from 'react';
import { Box, CssVarsProvider, Input, Typography } from '@mui/joy';

export const ChanalInput = () => {
    return (
        <CssVarsProvider>
            <Box>
                <Typography textColor='rgba(0, 0, 0, 0.6)' fontSize={15} fontWeight={400}>
                    Сеть
                </Typography>
                <Input
                    placeholder={'LD'}
                    name={'network'}
                    defaultValue={'LD'}
                />
            </Box>
        </CssVarsProvider>
    );
}