import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import TaskTable from './../TaskTable/TaskTable';

export default function WaitingTable(props) {
    const { tasks, setOpenModal, setProgress } = props;
    const columns = ['name', 'date_added']
    const columnLabels = ['Name', 'Date Added']
    const actions = ['go', 'delete']
    return (
        <Card
            sx={{
                padding: '20px',
                borderRadius: '10px',
                margin: "auto",
                overflow: "auto",
            }}
        >
            <CardContent sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                }}>
                    <Typography variant="h4" component="div">
                        ⏱ Waiting Tasks
                    </Typography>
                </Box>
                <TaskTable tasks={tasks} columns={columns} columnLabels={columnLabels} actions={actions} setOpenModal={setOpenModal} setProgress={setProgress}/>
            </CardContent>
        </Card>
    )
}
