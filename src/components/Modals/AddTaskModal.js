import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import {addTask, createReview} from './../../utils/postData';

export default function AddTaskModal(props) {
    const {openModal, setOpenModal, tasks, setTasks, setProgress} = props;
    const [task, setTask] = useState({'name': '', 'description': ''});

    const handleAddTask = (e) => {
        e.preventDefault();
        if (task.name.length === 0 || task.description.length === 0) {
            return;
        }
        addTask(task, tasks, setTasks, setProgress);
        setTask({'name': '', 'description': ''});
    }

    const handleAddAndCompleteTask = async (e) => {
        e.preventDefault();
        if (task.name.length === 0 || task.description.length === 0) {
            return;
        }
        const res = await addTask(task, tasks, setTasks, setProgress);
        const reviewSessionId = await createReview(res.id, setProgress);
        setTask({'name': '', 'description': ''});
        setOpenModal({open: true, type: 'complete-task', taskId: res.id, reviewSessionId: reviewSessionId});
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        bgcolor: 'background.paper',
        border: '0.5px solid #000',
        boxShadow: 20,
        p: 4
    }

    return (
        <div>
            <Modal
                open={openModal.open && openModal.type === 'add-task'}
                onClose={() => setOpenModal({open: false, type: ''})}
            >
                <Box sx={style}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '10px'
                    }}>
                        <Typography variant="h4" component="div">
                            📝 Add Task
                        </Typography>
                        <Typography variant="body1" component="div">
                            Create a new task to review.
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <FormControl>
                            <TextField label="Task Name" variant="standard" style={{
                                marginBottom: '20px',
                            }} value={task.name} onChange={(e)=>{setTask({...task, 'name': e.target.value})}}/>
                            <TextField label="Task Description" multiline rows={4} variant="outlined" style={{
                                marginBottom: '20px',
                            }} value={task.description} onChange={(e)=>{setTask({...task, 'description': e.target.value})}}/>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'start',
                            }}>
                                <Button variant="contained" sx={{
                                    marginRight: '10px',
                                    backgroundColor: 'primary.main',
                                }} onClick={handleAddTask}>Add</Button>
                                <Button variant="contained" sx={{
                                    backgroundColor: 'secondary.main',
                                    marginRight: '10px',
                                    '&:hover': {
                                        backgroundColor: 'secondary.dark',
                                    }
                                }} onClick={handleAddAndCompleteTask}>Add and Complete</Button>
                                <Button variant="contained" sx={{
                                    backgroundColor: '#ed6969',
                                    '&:hover': {
                                        backgroundColor: '#e46060',
                                    }
                                }} onClick={()=>{
                                    setOpenModal({open: false, type: ''})
                                }}>Cancel</Button>
                            </Box>
                        </FormControl>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
