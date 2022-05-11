import instance from './axios'

export const login = (data) => instance.post('/auth/login', data)
