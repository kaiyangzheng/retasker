import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { convertUtcToLocal } from '../../utils/dateHelpers'

export default function TaskTable(props) {
    const {tasks, columns, columnLabels} = props;
    const dateColumns = ['date_added', 'next_review_date', 'prev_review_date'];
    let data = []; 
    for (let i = 0; i < tasks.length; i++) {
        let row = {};
        for (let j = 0; j < columns.length; j++) {
            row[columns[j]] = tasks[i][columns[j]];
        }
        data.push(row);
    }

    return (
        <TableContainer component={Paper} sx={{
            border: "1px solid #e0e0e0",
            boxShadow: 'none'
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
                        return <TableRow 
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
                            <TableCell></TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
