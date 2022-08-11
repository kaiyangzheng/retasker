import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'

import Greeting from './../../components/Greeting/Greeting';
import ModifyGroup from './../../components/ModifyGroup/ModifyGroup';
import TaskReport from './../../components/TaskReport/TaskReport';
import WaitingTable from './../../components/WaitingTable/WaitingTable';
import NextTask from './../../components/NextTask/NextTask';

import styles from './Home.module.css';

export default function Home(props) {
    const { loaded, loggedIn, tasks, setTasks, goals, waitingTasks, nextTasks, tasksStats, setOpenModal } = props;

    useEffect(() => {
        document.title = "Retask | Home";
    }, [])

    if (!loaded) {
        return <>
            <div className="loading">
                Loading...
            </div>
        </>
    }

    const openAddTaskModal = () => {
        setOpenModal({ open: true, type: 'add-task' })
    }

    return (
        <div className={styles.home}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                ['@media (max-width: 768px)']: {
                    flexDirection: 'column',
                }
            }}>
                <Box sx={{
                    flexGrow: 2,
                    marginRight: '20px',
                    '.item:not(:first-child)': {
                        marginTop: '20px'
                    },
                    ['@media (max-width: 768px)']: {
                        marginTop: '0px',
                        marginBottom: '20px',
                        marginRight: '0px',
                    }
                }}>
                    <Box className="item" sx={{
                    }}>
                        <Box>
                            <Greeting loggedIn={loggedIn} />
                        </Box>
                        <Box sx={{
                            marginTop: '20px',
                        }}>
                            <TaskReport
                                goals={goals}
                                tasksStats={tasksStats}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    marginLeft: '20px',
                    '.item:not(:first-child)': {
                        marginTop: '20px'
                    },
                    ['@media (max-width: 768px)']: {
                        marginTop: '0px',
                        marginBottom: '20px',
                        marginLeft: '0px',
                    }
                }}>
                    <Box className="item">
                        <ModifyGroup
                            openAddTaskModal={openAddTaskModal} 
                            tasks={tasks}
                            setTasks={setTasks}
                        />
                    </Box>
                    <Box className="item">
                        <WaitingTable tasks={waitingTasks}/>
                    </Box>  
                    <Box className="item">
                        <NextTask tasks={nextTasks} />
                    </Box>
                </Box>
            </Box>
        </div >
    )
}
