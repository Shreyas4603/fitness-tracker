import axios from 'axios';

// Common headers for all requests
const headers = {
  'Content-Type': 'application/json',
};

// Function to make a GET request
export const getData = async (url) => {
  try {
    const response = await axios ({
        url:url,
        method:'GET',
        headers:headers
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

// Function to make a POST request
export const postData = async (url, body) => {
  try {
    const response =  await axios ({
        url:url,
        method:'POST',
        data:body,
        headers:headers
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error posting data: ${error.message}`);
  }
};

// Function to make a PUT request
export const putData = async (url, body) => {
  try {
    const response = await  axios ({
        url:url,
        method:'PUT',
        data:body,
        headers:headers
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error updating data: ${error.message}`);
  }
};

// Function to make a DELETE request
export const deleteData = async (url,body) => {
  try {
    const response = await axios ({
        url:url,
        method:'DELETE',
        data:body,
        headers:headers
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting data: ${error.message}`);
  }
};
