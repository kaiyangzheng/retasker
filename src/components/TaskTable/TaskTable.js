import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { convertUtcToLocal } from '../../utils/dateHelpers'
import { createReview, deleteTask } from '../../utils/postData'

import styles from './TaskTable.module.css'

export default function TaskTable(props) {
    const {tasks, columns, columnLabels, actions, setOpenModal, setProgress} = props;
    const dateColumns = ['date_added', 'next_review_date', 'prev_review_date'];
    let data = []; 
    for (let i = 0; i < tasks.length; i++) {
        let row = {};
        for (let j = 0; j < columns.length; j++) {
            row[columns[j]] = tasks[i][columns[j]];
        }
        row['id'] = tasks[i]['id'];
        data.push(row);
    }

    const handleReviewTask = async (taskId) => {
        const reviewSessionId = await createReview(taskId, setProgress);
        setOpenModal({open: true, type: 'complete-task', taskId: taskId, reviewSessionId: reviewSessionId});
    }

    return (
        <TableContainer component={Paper} sx={{
            border: "1px solid #e0e0e0",
            boxShadow: 'none',
            maxHeight: "150px",
        }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columnLabels.map((label, index) => {
                            return (
                                <TableCell key={index}>{label}</TableCell>
                            )
                        })}
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index)=>{
                        return <>
                            <TableRow 
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0
                                    }
                                }}
                            >
                                {columns.map((column, index)=>{
                                    if (dateColumns.includes(column)) {
                                        return (
                                            <TableCell key={index}>{convertUtcToLocal(row[column])}</TableCell>
                                        )
                                    }
                                    return (
                                        <TableCell key={index}>{row[column]}</TableCell>
                                    )
                                })}
                                <TableCell>
                                    {actions.map((action, index)=>{
                                        if (action === 'go') {
                                            return (
                                                <ExitToAppIcon key={index} className={styles.actionTaskIcon} onClick={()=>{handleReviewTask(row.id)}}/>
                                            )
                                        }
                                        if (action === 'delete') {
                                            return (
                                                <DeleteForeverOutlinedIcon key={index} className={styles.deleteTaskIcon} onClick={()=>{deleteTask(row.id)}}/>
                                            )
                                        }
                                    })}
                                </TableCell>
                            </TableRow>
                        </>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
