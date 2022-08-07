import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'

export default function TaskReportProgress(props) {
    const { progressVal, maxVal, text, type } = props
    return (
        <Paper sx={{
            border: '1px solid #e0e0e0',
            padding: '20px',
            borderRadius: '10px',
            width: '190px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',

        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography variant="h3" component="div" sx={{
                    textAlign: 'center',
                }}>
                    <Typography variant="h3" component="div" sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        {Math.round(progressVal * 100) / 100}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Typography variant="body2" color="text.secondary">/{Math.round(maxVal * 100) / 100}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{
                                fontSize: '11px',
                            }}>{type == 'time' ? 'limit' : 'goal'}</Typography>
                        </Box>
                    </Typography>
                    <Typography>
                        {text}
                    </Typography>
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '10px',
                }}>
                    <Box sx={{
                        width: '100%',
                        mr: 1
                    }}>
                        <LinearProgress value={Math.min(100, (progressVal / maxVal) * 100)} variant="determinate" />
                    </Box>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            {Math.min(100, Math.round((progressVal / maxVal) * 100, 2))}%
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}
