import axiosInstance from './axiosApi';

// add task 
export async function addTask(task, tasks, setTasks, setProgress) {
    setProgress(20);
    return axiosInstance.post('/api/v1/task/', task)
    .then(res =>{
        setProgress(100);
        return res.data;
    })
    .catch(err => {
        setProgress(0);
        console.log(err)
        return err.message
    })
}

// create review session
export async function createReview(taskId, setProgress){
    setProgress(0);
    return axiosInstance.post(`/api/v1/review-session/${taskId}/`)
    .then(res => {
        setProgress(100);
        return res.data.id;
    })
    .catch(err => {
        setProgress(0);
        console.log(err)
        return err.message
    })
}

// finish review session
export async function completeReview(taskId, reviewSessionId, quality, setTasks, tasks, setProgress){
    setProgress(0);
    return axiosInstance.put(`/api/v1/review-session/${taskId}/${reviewSessionId}/`, {'quality': quality})
    .then(res => {
        setProgress(100);
        return res.data;
    })
    .catch(err => {
        setProgress(0);
        console.log(err)
        return err.message
    })

}