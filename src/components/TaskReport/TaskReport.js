import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import TaskReportProgress from '../TaskReportProgress/TaskReportProgress'
import TaskReportImprovement from '../TaskReportImprovement/TaskReportImprovement'

export default function TaskReport(props) {
  const {goals, tasksStats} = props;

  if (tasksStats.message || Object.keys(goals).length === 0) {
    return <>
      <Card sx={{
      padding: '20px',
      display: 'flex',
      borderRadius: '10px',
      flexDirection: 'column',
    }}>
      <Typography variant="h4" component="div" sx={{
        marginBottom: '20px',
        ['@media (max-width: 768px)']: {
          textAlign: 'center',
        }
      }}>
        Task Report
      </Typography>
      <Box sx={{
        ['@media (max-width: 1024px)']: {
          display: 'flex',
          justifyContent: 'space-around',
        },
      }}>
        <Typography variant="h6" component="div">
          No tasks and/or goals to generate report!
        </Typography>
      </Box>
      </Card>
    </>
  }

  // compute max and min on time spent graph
  let timeSpent = tasksStats.improvement.average_time_spent;
  let timeSpentArr = [timeSpent.current, timeSpent.prev_review, timeSpent.average_prev_reviews];
  let maxTime = 0;
  let minTime = 0;
  for (let i = 0; i < timeSpentArr.length; i++){
    maxTime = Math.max(maxTime, timeSpentArr[i]);
    minTime = Math.min(minTime, timeSpentArr[i]);
  }
  maxTime += 5;
  minTime = Math.max(0, minTime-5);
  
  return (
    <Card sx={{
      padding: '20px',
      display: 'flex',
      borderRadius: '10px',
      flexDirection: 'column',
    }}>
      <Typography variant="h4" component="div" sx={{
        marginBottom: '20px',
        ['@media (max-width: 768px)']: {
          textAlign: 'center',
        }
      }}>
        Task Report
      </Typography>
      <Box sx={{
        ['@media (max-width: 1024px)']: {
          display: 'flex',
          justifyContent: 'space-around',
        },
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '20px',
          '.item:not(:first-child)': {
            marginTop: '0px'
          },
          ['@media (max-width: 1024px)']: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0px',
            '.item:not(:first-child)': {
              marginTop: '20px'
            }
          }
        }}>
          <div className="item">
            <TaskReportProgress progressVal={tasksStats.basic_info.total_tasks_added} maxVal={goals.total_added} text={'Tasks Added'} type={'added'} />
          </div>
          <div className="item">
            <TaskReportProgress progressVal={tasksStats.stats.average_quality} maxVal={goals.average_quality} text={'Average Quality'} type={'average'} />
          </div>
          <div className="item">
            <TaskReportProgress progressVal={tasksStats.stats.average_repetitions} maxVal={goals.average_repetitions} text={'Average Repetitions'} type={'average'} />
          </div>
          <div className="item">
            <TaskReportProgress progressVal={tasksStats.stats.average_time_spent} maxVal={goals.average_time_spent} text={'Average Time Spent'} type={'time'} />
          </div>
        </Box >
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '20px',
          '.item:not(:first-child)': {
            marginTop: '0px'
          },
          ['@media (max-width: 1024px)']: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0px',
            '.item:not(:first-child)': {
              marginTop: '20px'
            }
          }
        }}>
          <div className="item">
            <TaskReportImprovement data={tasksStats.improvement.average_quality} text={'Average Quality'} min={0} max={5} step={1}/>
          </div>
          <div className="item">
            <TaskReportImprovement data={tasksStats.improvement.percent_understood} text={'Percent Understood'} min={0} max={1} step={0.1}/>
          </div>
          <div className="item">
            <TaskReportImprovement data={tasksStats.improvement.average_ease_factor} text={'Average EaseFactor'} min={1.3} max={5} step={1}/>
          </div>
          <div className="item">
            <TaskReportImprovement data={tasksStats.improvement.average_time_spent} text={'Average Time'} min={minTime} max={maxTime} step={1}/>
          </div>
        </Box>
      </Box>
    </Card >
  )
}
