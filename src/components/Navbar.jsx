import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography, { typographyClasses } from '@mui/joy/Typography';
import InputIcon from '../assets/icons/input.svg';
import EyeIcon from '../assets/icons/eye.svg';
import { Box, CssBaseline, CssVarsProvider, Sheet } from '@mui/joy';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation()

    const chain = ['/', '/events', '/prepare', '/result']

    console.log(location.pathname.split`/`[1])

    const isActive = (pathName) => '/'+location.pathname.split`/`[1] === pathName
    const isCompleted = (pathName) => chain.indexOf('/'+location.pathname.split`/`[1]) > chain.indexOf(pathName)
    const getColor = (pathName) => isActive(pathName) ? 'primary' : isCompleted(pathName) ? 'success' : 'neutral'

    return (

        <CssVarsProvider>
            <CssBaseline>{/*bgcolor={'var(--joy-palette-background-surface, var(--joy-palette-neutral-50, #FBFCFE))'*/}
                <Box p={5} position='fixed' left={0} top={0} width={250} height={'100%'} display='flex' justifyContent='center' alignItems='center'>
                    <Stepper
                        orientation="vertical"
                        sx={{
                            '--Stepper-verticalGap': '2.5rem',
                            '--StepIndicator-size': '2.5rem',
                            '--Step-gap': '1rem',
                            '--Step-connectorInset': '0.5rem',
                            '--Step-connectorRadius': '1rem',
                            '--Step-connectorThickness': '4px',
                            '--joy-palette-success-solidBg': 'var(--joy-palette-success-400)',
                            [`& .${stepClasses.completed}`]: {
                                '&::after': { bgcolor: 'success.solidBg' },
                            },
                            [`& .${stepClasses.active}`]: {
                                [`& .${stepIndicatorClasses.root}`]: {
                                    border: '4px solid',
                                    borderColor: '#fff',
                                    boxShadow: (theme) => `0 0 0 1px ${theme.vars.palette.primary[500]}`,
                                },
                            },
                            [`& .${stepClasses.disabled} *`]: {
                                color: 'neutral.softDisabledColor',
                            },
                            [`& .${typographyClasses['title-sm']}`]: {
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '10px',
                            },
                        }}
                    >
                        <Step
                            active={isActive('/')}
                            completed={isCompleted('/')}
                            indicator={
                                <StepIndicator variant="solid" color={getColor('/')}>
                                    <img src={InputIcon} />
                                </StepIndicator>
                            }
                        >
                            <Box fontWeight={400} >
                                <Typography variant='secondary' level="title-sm">Шаг 1</Typography>
                                Список задач
                            </Box>
                        </Step>
                        <Step
                            active={isActive('/events')}
                            completed={isCompleted('/events')}
                            indicator={
                                <StepIndicator variant="solid" color={getColor('/events')}>
                                    <img src={EyeIcon} />
                                </StepIndicator>
                            }
                        >
                            <Box fontWeight={400} >
                                <Typography variant='secondary' level="title-sm">Шаг 2</Typography>
                                События и станции

                            </Box>
                        </Step>
                        <Step
                            active={isActive('/prepare')}
                            completed={isCompleted('/prepare')}
                            indicator={
                                <StepIndicator variant="solid" color={getColor('/prepare')}>
                                    <img src={InputIcon} />
                                </StepIndicator>
                            }
                        >
                            <Box fontWeight={400} >
                                <Typography variant='secondary' level="title-sm">Шаг 3</Typography>
                                Подготовка данных для томографии
                            </Box>
                        </Step>
                        <Step
                            completed={isCompleted('/result')}
                            active={isActive('/result')}
                            indicator={<StepIndicator variant="solid" color={getColor('/result')}>
                                <img src={EyeIcon} />
                            </StepIndicator>}
                        >

                            <Box fontWeight={400} >
                                <Typography variant='secondary' level="title-sm">Шаг 4</Typography>
                                Результат томографии
                            </Box>
                        </Step>
                    </Stepper>

                </Box>
            </CssBaseline>
        </CssVarsProvider>

    );
}

export default Navbar