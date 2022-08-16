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
import Footer from './components/Footer/Footer';

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
  const [waitingTasks, setWaitingTasks] = useState([]);
  const [nextTasks, setNextTasks] = useState({});

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

  // migrate to backend in the future
  const getWaitingTasks = () => {
    const waitingTasks = tasks.filter(task => task.prev_review_date == null);
    setWaitingTasks(waitingTasks);
  }

  // migrate to backend in the future
  const getNextTask = () => {
    let sortedTasks = tasks.sort((a, b) => {
      return a.prev_review_date - b.prev_review_date;
    })
    sortedTasks = sortedTasks.filter(task => task.prev_review_date != null);
    if (sortedTasks.length > 0) {
      setNextTasks(sortedTasks.splice(0, 3));
    }else{
      setNextTasks([]);
    }
  }

  // get info from task api - run when user logs in
  useEffect(() => {
    const getData = async () => {
      await getTasks(setTasks, setLoaded, loaded);
      await getTasksStats(setTasksStats, setLoaded, loaded);
      await getGoals(setGoals, setLoaded, loaded)
      getWaitingTasks();
      getNextTask();
      setLoaded(true);
    }

    if (loggedIn.loggedIn) {
      getData();
    }
    // data is loaded when user logs in and when progress changes
  }, [loggedIn, tasks])


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
          <AppBar 
            theme={theme} 
            setTheme={setTheme} 
            loggedIn={loggedIn} 
            setLoggedIn={setLoggedIn} 
            open={openAppbar} 
            setOpen={setOpenAppbar} 
            setTasks={setTasks}
            setTasksStats={setTasksStats}
            setGoals={setGoals}
          >
            <Routes>
              <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setProgress={setProgress} />} />
              <Route path="/home" element={<Home 
                loaded={loaded}
                loggedIn={loggedIn}
                tasks={tasks}
                setTasks={setTasks}
                tasksStats={tasksStats}
                goals={goals}
                waitingTasks={waitingTasks}
                nextTasks={nextTasks}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setProgress={setProgress} 
              />}
              />
            </Routes>
            <Footer />
          </AppBar>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;