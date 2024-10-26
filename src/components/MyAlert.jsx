import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';

export const MyAlert = ({ size = 'md', title, description, icon, color }) => {
    return (
        <Box display='flex' gap={2} flexDirection='column'>
            <Alert
                size={size}
                key={title}
                sx={{ alignItems: 'flex-start' }}
                startDecorator={<img src={icon} />}
                variant="soft"
                color={color}
            >
                <div>
                    <div>{title}</div>
                    <Typography level="body-sm" color={color}>
                        {description}
                    </Typography>
                </div>
            </Alert>
        </Box>
    );
}