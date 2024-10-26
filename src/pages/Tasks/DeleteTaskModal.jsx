import React, { useEffect } from 'react'
import WarningRoundedIcon from '../../assets/icons/warning.svg'
import { Button, CssVarsProvider, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from '@mui/joy'
import { deleteTask } from '../../api/deleteTask'

export const DeleteTaskModal = ({ open, setOpen, id }) => {
    return (
        <CssVarsProvider>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <img src={WarningRoundedIcon} alt="" />
                        Удаление задачи
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Вы уверены, что хотите удалить задачу #{id}?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={() => { deleteTask(id).then(() => setOpen(false)) }}>
                            Удалить
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Отмена
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </CssVarsProvider>
    )
}
