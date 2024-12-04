import axios from 'axios';

// Базовый URL для запросов
const API_URL = 'http://localhost:5095'; // Укажите ваш адрес

// Получение данных сотрудника по id
export const getTootajad = async () => {
    try {
        const response = await axios.get(`${API_URL}/tootaja/andmed`, {
            headers: {
                'UserId': localStorage.getItem('userId') // или через сессию
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching employee data', error);
        throw error;
    }
};

// Получение рабочего времени сотрудника
export const getWorkHours = async () => {
    try {
        const response = await axios.get(`${API_URL}/tootaja/tooaeg`, {
            headers: {
                'UserId': localStorage.getItem('userId')
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching work hours', error);
        throw error;
    }
};

// Добавление рабочего времени
export const addWorkHour = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/tootaja/tooaeg_lisamine`, data, {
            headers: {
                'UserId': localStorage.getItem('userId')
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding work hour', error);
        throw error;
    }
};

// Логин
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });

        // Логика для определения роли пользователя
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("isAdmin", response.data.isAdmin);

        return {
            id: response.data.id,
            isAdmin: response.data.isAdmin
        };
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};

// Логаут
export const logout = async () => {
    try {
        const response = await axios.post(`${API_URL}/auth/logout`);
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin');
        return response.data;
    } catch (error) {
        console.error('Logout failed', error);
        throw error;
    }
};
