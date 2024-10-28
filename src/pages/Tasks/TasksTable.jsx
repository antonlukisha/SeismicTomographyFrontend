import { Box, CircularProgress, IconButton, Link, Sheet, Table, Tooltip, Typography } from '@mui/joy'
import dayjs from 'dayjs'
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import InfoIcon from "../../assets/icons/info.svg"
import DeleteIcon from "../../assets/icons/delete.svg"
import WarningIcon from "../../assets/icons/warning.svg"
import DoneIcon from "../../assets/icons/done.svg"
import { useTasksStore } from '../../stores/useTasksStore'
import { DeleteTaskModal } from './DeleteTaskModal'
import { InfoTaskModal } from './InfoTaskModal'
import { getTasks } from '../../api/getTasks';
import { useAlertsStore } from '../../stores/useAlertsStore';
import { MyAlert } from '../../components/MyAlert';

export const TasksTable = React.memo(() => {

    const tasks = useTasksStore(state => state.tasks)
    const isEmpty = useTasksStore(state => state.isEmpty)
    const setTasks = useTasksStore(state => state.setTasks)

    const denied = useAlertsStore(state => state.isDeniedAlertOpen)
    const success = useAlertsStore(state => state.isSuccessAlertOpen)
    const setDenied = useAlertsStore(state => state.setDenied)

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [idToDelete, setIdToDelete] = useState('')
    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const [idToInfo, setIdToInfo] = useState('')

    const colors = {
        'DONE': 'success',
        'FAILED': 'danger',
        'PENDING': 'success',
        'PLAIN': 'neutral',
    }

    const states = {
        'DONE': 'Выполнено',
        'FAILED': 'Ошибка',
        'PENDING': 'Ожидание',
        'PLAIN': 'Создана',
    }

    const steps = {
        'SEISDATA': 'События и станции',
        'TOMOGRAPHY': 'Томография'
    }

    useEffect(() => {
        getTasks().then(data => setTasks(data.content)).catch(console.log)
        const interval = setInterval(() => {
            getTasks().then(data => setTasks(data.content)).catch(setDenied)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <Box height={'90vh'} mt={7}>

            {success &&
                <Box position={'absolute'} top={2} left={'45%'}>
                    <MyAlert description={'Задача добавлена'} icon={DoneIcon}/>
                </Box>}
            {denied &&
                <Box position={'absolute'} top={2} left={'45%'}>
                    <MyAlert title={'Ошибка'} description={'При получении списка задач произошла ошибка'} icon={WarningIcon} />
                </Box>}

            <DeleteTaskModal open={isDeleteOpen} setOpen={setIsDeleteOpen} id={idToDelete} />
            <InfoTaskModal open={isInfoOpen} setOpen={setIsInfoOpen} id={idToInfo} />
            {isEmpty ?
                <MyAlert
                    title={'Задачи отсутствуют'}
                    description={'Здесь будет таблица задач. Добавьте задачу!'}
                    color='neutral'
                    icon={InfoIcon} /> :
                <Sheet style={{ background: 'none' }} sx={{ height: '80vh', overflow: 'auto' }}>
                    <Table borderAxis='both' stickyHeader size='lg' aria-label="table with sticky header" variant="plane" >
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>Номер</th>
                                <th style={{ width: '15%' }}>Этап</th>
                                <th style={{ width: '10%' }}>Статус</th>
                                <th>Время добавления</th>
                                <th>Время окончания</th>
                                <th style={{ width: '15%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) =>
                                <tr key={index}>
                                    <td style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} >
                                        <Link
                                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline' }}
                                            component={RouterLink}
                                            disabled={task.state !== "DONE" && task.state !== "PENDING"}
                                            to={`/events/${task.id}`}
                                        >
                                            #{task.id}
                                        </Link>
                                    </td>
                                    <td>{task.step && steps[task.step]}</td>
                                    {task.state == "IN_PROGRESS"
                                        ?
                                        <td>
                                            <CircularProgress size="sm" />
                                        </td>
                                        :
                                        <td >
                                            <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} color={colors[task.state]} >
                                                {states[task.state]}
                                            </Typography>
                                        </td>}
                                    <td>{new Date(task.created_at).toLocaleString()}</td>
                                    <td>{task.completed_in && new Date(task.completed_in).toLocaleString()}</td>
                                    <td>
                                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={0}>
                                            <Tooltip title="Информация" size="md">
                                                <IconButton onClick={() => { setIsInfoOpen((prev) => true); setIdToInfo(task.id) }}>
                                                    <img src={InfoIcon} alt="info_icon" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Удалить" size="md">
                                                <IconButton onClick={() => { setIsDeleteOpen((prev) => true); setIdToDelete(task.id) }}>
                                                    <img src={DeleteIcon} alt="delete_icon" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </td>
                                </tr>
                            )}
                            <tr style={{ visibility: 'hidden' }}></tr>
                        </tbody>
                    </Table>
                </Sheet>
            }<div></div>
        </Box >
    )
})
