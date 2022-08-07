import axiosInstance from './axiosApi';

export async  function login(user, setLoggedIn, setProgress) {
    setProgress(20);
    return axiosInstance.post('/api/v1/token/obtain/', user)
    .then(res => {
        console.log(res);
        axiosInstance.defaults.headers['Authorization'] = 'JWT ' + res.data.access
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('user', user.username)
        localStorage.setItem('access_token', res.data.access)
        localStorage.setItem('refresh_token', res.data.refresh)
        setLoggedIn({
            loggedIn: true,
            user: user.username,
            accessToken: res.data.access,
            refreshToken: res.data.refresh
        })
        setProgress(100);

    })
    .catch(err => {
        console.log(err)
        setProgress(0);
    })
}

export async function getGoals(setGoals){
    return axiosInstance.get('/api/v1/goal/')
    .then(res => {
        setGoals(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}

export async function getTasks(setTasks){
    return axiosInstance.get('/api/v1/task/')
    .then(res => {
        setTasks(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}

export async function getTasksStats(setTasksStats){
    return axiosInstance.get('/api/v1/task-stats/')
    .then(res => {
        setTasksStats(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}

export async function getReviewSessions(setReviewSessions, taskId){
    return axiosInstance.get(`/api/v1/review-session/${taskId}`)
    .then(res => {
        setReviewSessions(res.data)
    }
    ).catch(err => {
        console.log(err)
    })
}

export async function getFriendRequests(setFriendRequests){
    return axiosInstance.get('/api/v1/friend/request/')
    .then(res => {
        setFriendRequests(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}