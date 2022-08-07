import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import './App.css';

import AppBar from './components/AppBar/AppBar';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import AddTaskModal from './components/Modals/AddTaskModal';
import CompleteTaskModal from './components/Modals/CompleteTaskModal';

import { getTasks, getGoals, getTasksStats } from './utils/loadData';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [openAppbar, setOpenAppbar] = useState(false);
  const [loggedIn, setLoggedIn] = useState({ loggedIn: false, user: '', access_token: '', refresh_token: '' });
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);


  // task api
  const [tasks, setTasks] = useState([]);
  const [tasksStats, setTasksStats] = useState({});
  const [goals, setGoals] = useState({});

  // modal
  const [openModal, setOpenModal] = useState({'open': false, 'type': '', 'taskId': '', 'reviewSessionId': ''});

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      setLoggedIn({ loggedIn: true, user: localStorage.getItem('user'), token: localStorage.getItem('access_token') })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme])

  // get info from task api - run when user logs in
  useEffect(() => {
    const getData = async () => {
      await getTasks(setTasks, setLoaded, loaded);
      await getTasksStats(setTasksStats, setLoaded, loaded);
      await getGoals(setGoals, setLoaded, loaded)
      setLoaded(true);
    }

    if (loggedIn.loggedIn) {
      getData();
    }
    // data is loaded when user logs in and when progress changes
  }, [loggedIn, progress])


  const darkTheme = createTheme({
    palette: {
      mode: theme
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <LoadingBar progress={progress} onLoaderFinished={() => setProgress(0)} />
      <AddTaskModal openModal={openModal} setOpenModal={setOpenModal} tasks={tasks} setTasks={setTasks} setProgress={setProgress}/>
      <CompleteTaskModal openModal={openModal} setOpenModal={setOpenModal} tasks={tasks} setTasks={setTasks} setProgress={setProgress}/>
      <Router>
        <div className="App">
          <AppBar theme={theme} setTheme={setTheme} loggedIn={loggedIn} setLoggedIn={setLoggedIn} open={openAppbar} setOpen={setOpenAppbar} >
            <Routes>
              <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setProgress={setProgress} />} />
              <Route path="/home" element={<Home 
                loaded={loaded}
                loggedIn={loggedIn}
                tasks={tasks}
                setTasks={setTasks}
                tasksStats={tasksStats}
                goals={goals}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setProgress={setProgress} 
              />}
              />
            </Routes>
          </AppBar>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;