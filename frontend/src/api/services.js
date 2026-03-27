import api from './axios';

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

export const groupAPI = {
  create: (data) => api.post('/groups', data),
  update: (groupId, data) => api.put(`/groups/${groupId}`, data),
  getMembers: (groupId) => api.get(`/groups/${groupId}/members`),
};

export const expenseAPI = {
  createManual: (groupId, data) => api.post(`/groups/${groupId}/expenses`, data),
  scanAI: (groupId, data) => api.post(`/groups/${groupId}/expenses/scan`, data, { headers: { 'Content-Type': 'multipart/form-data' }}),
  getDetails: (expenseId) => api.get(`/expenses/${expenseId}`),
  calculateDebts: (expenseId) => api.get(`/expenses/${expenseId}/calculate`),
  splitItem: (expenseId, itemId, data) => api.post(`/expenses/${expenseId}/items/${itemId}/split`, data),
};
