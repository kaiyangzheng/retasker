import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors'

export default function ModifyGroup(props) {
    const { tasks, setTasks, openAddTaskModal } = props;
    return (
        <Card sx={{
            padding: '20px',
            borderRadius: '10px',
            margin: "auto",

            ['@media (max-width: 768px)']: {
                maxWidth: "100%",
                display: "flex",
            },
            ['@media (max-width: 620px)']: {
                flexDirection: 'column',
            }

        }}>
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
                }}>
                    <Typography variant="h4" component="div">
                        🔧 Modify Tasks
                    </Typography>
                    <Typography variant="body1" component="div">
                        Add, edit, delete or favorite your tasks.
                    </Typography>
                </Box>

                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "20px",
                    '& > *': {
                        width: '45px',
                        height: '45px'
                    }

                }}>
                    <Fab color="primary" onClick={openAddTaskModal}>
                        <AddIcon />
                    </Fab>
                    <Fab color="secondary">
                        <EditIcon />
                    </Fab>
                    <Fab color="error">
                        <DeleteIcon />
                    </Fab>
                    <Fab sx={{
                        color: pink[500],
                        backgroundColor: pink[50],
                    }}>
                        <FavoriteIcon />
                    </Fab>
                </Box>

            </CardContent>
            <CardActions sx={{
                flexGrow: 2,
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Button size="small">Today</Button>
                <Button size="small">Upcoming</Button>
                <Button size="small">Calendar</Button>
            </CardActions>
        </Card >
    )
}