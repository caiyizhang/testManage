
import axiosInstance from "./index"


const axios = axiosInstance

// export const login = () => {return axios.get('/testcases')}

// export const getAutoTestResult = () => {return axios.get('/testcases/api/result/')}

// export const getAutoTestResultDetail = () => {return axios.get('/testcases/api/getAutoTestResultDetail')}

export const getToken = (username, password) => {return axios.post('/api/token/', {'username': username, 'password': password})}
export const refreshToken = (refreshToken) => {return axios.post('/api/token/refresh/', {'refresh': refreshToken})}
export const logOut = () => {return axios.post('/users/logout', {'refresh': refreshToken})}
