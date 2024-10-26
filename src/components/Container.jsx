import Box from '@mui/joy/Box/Box';

export const Container = ({ children }) => {
    return (
        <Box
            sx={{
                width: { xs: '95%', md: '95%', lg: '1200px' },
                height: '100%',
                margin: '0 auto',
            }}
        >
            {children}
        </Box>
    );
};