import axios from 'axios';

const URL = 'https://683d59b3199a0039e9e514ab.mockapi.io/auth';
const commentsURL = 'https://683d59b3199a0039e9e514ab.mockapi.io/comments';

export const getByName = (username) => axios.get(`${URL}?username=${username}`);
export const getById = (id) => axios.get(`${URL}/${id}`);
export const apiRegister = (data) => axios.post(URL, data);
export const apiUpdate = (id, data) => axios.put(`${URL}/${id}`, data);
export const apiComment = (data) => axios.post(commentsURL, data);
export const getCommentsById = (videoId) => axios.get(`${commentsURL}?videoId=${encodeURIComponent(videoId)}`);

export const getByMail = async (email) => {
  try {
    const res = await axios.get(`${URL}?email=${email}`);
    return res.data.length > 0;
  } catch (err) {
    console.error(err);
    return false;
  }
};
