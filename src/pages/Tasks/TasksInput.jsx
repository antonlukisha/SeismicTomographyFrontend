import { Box, Button, CssVarsProvider, Typography } from '@mui/joy'
import CoordInput from './CoordInput'
import { DateInput } from './DateInput'
import { useRef } from 'react'
import dayjs from 'dayjs'
import { ChanalInput } from './ChanalInput'
import { createTask } from '../../api/createTask'
import { startTask } from '../../api/startTask'
import { useAlertsStore } from '../../stores/useAlertsStore'

export const TasksInput = () => {

    const setDenied = useAlertsStore(state => state.setDenied)

    const setSuccess = useAlertsStore(state => state.setSuccess)

    const formRef = useRef(null)

    const data = [
        ["min_latitude", "Минимальная широта", -90.0],
        ["max_latitude", "Максимальная широта", 90.0],
        ["min_longitude", "Минимальная долгота", -180.0],
        ["max_longitude", "Максимальная долгота", 180.0]
    ]

    const send = (inputValues) => {
        inputValues["start_time"] = dayjs(inputValues["start_time"]).toISOString()
        inputValues["end_time"] = dayjs(inputValues["end_time"]).toISOString()
        inputValues["min_latitude"] = Number(inputValues["min_latitude"])
        inputValues["max_latitude"] = Number(inputValues["max_latitude"])
        inputValues["min_longitude"] = Number(inputValues["min_longitude"])
        inputValues["max_longitude"] = Number(inputValues["max_longitude"])
        createTask().then(data => startTask(data.content.id, inputValues)).then(setSuccess).catch(setDenied)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const inputValues = {}
        const entries = [...event.currentTarget].filter(el => el.tagName === 'INPUT')
        entries.forEach(el => {
            inputValues[el.name] = el.value
        })
        send(inputValues)
    }

    return (
        <Box mt={7}>
            <form ref={formRef} action="submit" onSubmit={submitHandler} >
                <Box display='grid' gap={5}>
                    <Box display='grid' gap={3}>
                        <CssVarsProvider>
                            <Typography level='title-lg' fontWeight={400}>Ограничения по времени</Typography>
                        </CssVarsProvider>
                        <DateInput />
                    </Box>
                    <CssVarsProvider>
                        <Box display='grid' gap={3}>
                            <Typography level='title-lg' fontWeight={400}>Географические Ограничения</Typography>
                            <Box display='grid' gap={1}>
                                {data.map((coord, i) =>
                                    <CoordInput
                                        keyName={coord[0]}
                                        name={coord[1]}
                                        limit={coord[2]}
                                        key={i}
                                    />
                                )}
                                <ChanalInput />
                            </Box>
                        </Box>
                        <Button size='lg' type='submit' >Добавить задачу</Button>
                    </CssVarsProvider>
                </Box>

            </form>
        </Box>
    )
}
