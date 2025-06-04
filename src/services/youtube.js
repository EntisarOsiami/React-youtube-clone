import axios from "axios";

const API_KEY = 'AIzaSyAYUyh-XbAsIdNUQJdQQWpxypFq2DOgnzk';
const API_KEY2 = import.meta.env.VITE_YOUTUBE_API_KEY2; // For comments, for now unused

const URL = "https://www.googleapis.com/youtube/v3/videos";


// get 10 videos from the youtube api
export async function getAllVideos(pageToken = "") {
  try {
    const response = await axios.get(URL, {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        maxResults: 50,
        pageToken,
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
// get video details by id using the youtube api
export async function getVideoById(id) {
  try {
    const response = await axios.get(URL, {
      params: {
        id: id,
        part: "snippet,contentDetails,statistics",
        key: API_KEY,
      },
    });
    return response.data.items[0];
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
// get video comments by  video id using the youtube api
export async function getCommentsById  (id) {
  try {
    const response = await axios.get(URL, {
      params: {
        id: id,
        part: "snippet",
        key: API_KEY2,
      },
    });
    return response.data.items[0];
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
}