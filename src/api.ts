import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const api = axios.create({
    baseURL: API_URL,
});

export const compareFaces = async (file1: File, file2: File) => {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);
    const response = await api.post('/compare', formData);
    return response.data;
};

export const registerFace = async (file: File, name: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    const response = await api.post('/register', formData);
    return response.data;
};

export const recognizeFace = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/recognize', formData);
    return response.data;
};
