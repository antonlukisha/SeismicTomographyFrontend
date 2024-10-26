import React, { useRef } from 'react';
import { Box, CssVarsProvider, Input, Typography } from '@mui/joy';

const CoordInput = ({ keyName, limit, name }) => {

    const inputRef = useRef(null);

    return (
        <CssVarsProvider>
            <Box>
                <Typography textColor='rgba(0, 0, 0, 0.6)' fontSize={15} fontWeight={400}>
                    {name}:
                </Typography>
                <Input
                    placeholder={limit.toString()}
                    type="number"
                    name={keyName}
                    slotProps={{
                        input: {
                            required: true,
                            ref: inputRef,
                            min: -Math.abs(limit),
                            max: Math.abs(limit),
                            step: 1.0,
                        },
                    }}
                />
            </Box>
        </CssVarsProvider>
    );
}

export default CoordInput;