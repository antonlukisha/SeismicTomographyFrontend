import React, { useEffect, useState } from 'react'
import InfoIcon from '../../assets/icons/info.svg'
import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem, ListItemButton, Modal, ModalDialog, Typography } from '@mui/joy'
import { getTaskInfo } from '../../api/getTaskInfo'

export const InfoTaskModal = ({ open, setOpen, id }) => {

    const [taskInfo, setTaskInfo] = useState({})

    useEffect(() => {
        getTaskInfo(id).then(data => {
            setTaskInfo({
                "Дата начала": data.content.start_time,
                "Дата окончания": data.content.end_time,
                "Сеть": data.content.network,
                "Минимальная широта": data.content.min_latitude,
                "Максимальная широта": data.content.max_latitude,
                "Минимальная долгота": data.content.min_longitude,
                "Максимальная долгота": data.content.max_longitude,
            });
        })
    }, [open])

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog sx={{ width: '40%' }} variant="outlined" role="alertdialog">
                <DialogTitle >
                    <img src={InfoIcon} alt="info icon" />
                    Задача #{id}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {
                        Object.keys(taskInfo).length === 0 ? <CircularProgress /> :
                            <List>
                                {Object.keys(taskInfo).map(key =>
                                    <ListItem key={key}>
                                        <ListItemButton sx={{ display: 'flex', justifyContent: 'space-between' }} >
                                            <Typography>{key}:</Typography>
                                            <Typography fontWeight={100} textAlign={'right'}>{taskInfo[key]}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </List>
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                        Закрыть
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    )
}
