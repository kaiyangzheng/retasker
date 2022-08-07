import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import BarChart from './../../components/BarChart/BarChart'

export default function TaskReportImprovement(props) {
    const { data, min, max, step, text } = props;
    let chartData = [data.current, data.prev_review, data.average_prev_reviews];
    let labels = ['Current', 'Prev.', 'Prev. Average'];
    return (
        <Paper sx={{
            border: '1px solid #e0e0e0',
            padding: '20px',
            borderRadius: '10px',
            width: '190px',
            height: '200px'
        }}>
            <BarChart chartData={chartData} labels={labels} min={min} max={max} step={step} text={text} />
        </Paper>
    )
}