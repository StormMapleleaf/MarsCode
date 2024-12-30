import axios from 'axios';

const API_BASE_URL = 'http://localhost:80/api'; // 根据你的实际后端地址调整

// 用户相关API
export const registerUser = async (userData) => {
    return axios.post(`${API_BASE_URL}/user/register`, userData);
};

export const loginUser = async (userData) => {
    return axios.post(`${API_BASE_URL}/user/login`, userData);
};

export const getAllUsers = async () => {
    return axios.post(`${API_BASE_URL}/user/users`);
};

// 商品相关API
export const createProduct = async (productData) => {
    return axios.post(`${API_BASE_URL}/product/create`, productData);
};

export const updateProduct = async (productData) => {
    return axios.post(`${API_BASE_URL}/product/update`, productData);
};

export const deleteProduct = async (productId) => {
    return axios.post(`${API_BASE_URL}/product/delete`, { id: productId });
};

export const getAllProducts = async () => {
    return axios.post(`${API_BASE_URL}/product/all`);
};

export const getActiveProducts = async () => {
    return axios.post(`${API_BASE_URL}/product/active`);
};

// 反馈相关API
export const createFeedback = async (feedbackData) => {
    return axios.post(`${API_BASE_URL}/feedback/create`, feedbackData);
};

export const getProductFeedbacks = async (productId) => {
    return axios.post(`${API_BASE_URL}/feedback/list`, { product_id: productId });
};