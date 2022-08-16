import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

import { completeReview } from '../../utils/postData'
import { convertUtcToLocal } from '../../utils/dateHelpers'

export default function CompleteTaskModal(props) {
    const {openModal, setOpenModal, tasks, setTasks, setProgress} = props;
    const [quality, setQuality] = useState(0);
    const [completedTask, setCompletedTask] = useState(false);

    let taskId = openModal.taskId;
    let reviewSessionId = openModal.reviewSessionId;
    let task = tasks.find(task => task.id === taskId);

    if (!task || !openModal.reviewSessionId) {
        return <>
            <div className="loading">
                Loading...
            </div>
        </>
    }

    const handleCompleteTask = async (e) => {
        e.preventDefault();
        if (quality.length === 0) {
            return;
        }
        const res = await completeReview(taskId, reviewSessionId, parseFloat(quality), setTasks, tasks, setProgress);
        setCompletedTask(true);
    }

    const handleClose = () => {
        setOpenModal({open: false, type: ''});
        setCompletedTask(false);;
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
                open={openModal.open && openModal.type === 'complete-task'}
                onClose={handleClose}
            >
                {!completedTask ? <Box sx={style}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '5px'
                    }}>
                        <Typography variant="h4" component="div">
                            Task #{task.id}: {task.name}
                        </Typography>
                        <Typography variant="body1" component="div">
                            {task.description}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '15px'
                    }}>
                        <Typography variant="body1" component="div">
                            After completing this task, rate the quality in which you accomplished it.
                        </Typography>
                        <Typography variant="body2" component="div">
                            This will determine the next date you will review this task.
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <FormControl>
                            <TextField
                                select 
                                label="Quality"
                                value={quality}
                                onChange={(e) => setQuality(e.target.value)}    
                                SelectProps={{
                                    native: true,
                                }}
                                sx={{
                                    marginBottom: '20px',   
                                }}
                            >
                                <option value={0} selected>0 - complete blackout</option>
                                <option value={1}>1 - incorrect response; the correct one remembered</option>
                                <option value={2}>2 - incorrect response; the correct one easy to recall</option>
                                <option value={3}>3 - correct response with serious difficulty</option>
                                <option value={4}>4 - correct response after hesitation</option>
                                <option value={5}>5 - perfect response</option>
                            </TextField>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'start',
                            }}>
                                <Button variant="contained" sx={{
                                    marginRight: '10px',
                                    backgroundColor: 'primary.main',
                                }} onClick={handleCompleteTask}>
                                    Complete
                                </Button>
                                <Button variant="contained" sx={{
                                    backgroundColor: '#ed6969',
                                    '&:hover': {
                                        backgroundColor: '#d14b4b',
                                    }
                                }} onClick={handleClose}>
                                    Cancel
                                </Button>
                            </Box>
                        </FormControl>
                    </Box>
                </Box> : 
                <Box sx={style}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography variant="h4" component="div">
                            Task #{task.id}: {task.name}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Next review date: <strong>{convertUtcToLocal(task.next_review_date)}</strong>
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '15px'
                        }}>
                            <Typography variant="body1" component="div">
                                Quality: {task.quality}
                            </Typography>
                            <Typography variant="body1" component="div">
                                Repetitions; {task.repetitions}
                            </Typography>
                            <Typography variant="body1" component="div">
                                Ease Factor (EF): {task.ease_factor}
                            </Typography>
                        </Box>
                        <Button variant="contained" onClick={handleClose}>
                            Close
                        </Button>
                    </Box>
                </Box>}
            </Modal>
        </div>
    )
}
