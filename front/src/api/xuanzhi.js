import axiosInstance from "./index"


const axios = axiosInstance

// export const login = () => {return axios.get('/testcases')}

// export const getAutoTestResult = () => {return axios.get('/testcases/api/result/')}

// export const getAutoTestResultDetail = () => {return axios.get('/testcases/api/getAutoTestResultDetail')}
export const getProvince = () => {
    return axios.get('/xuanzhi/api/province')
};
export const getCitys = (province) => {
    return axios.get('/xuanzhi/api/citys',{'province':province} )
};
export const getRegions = (province, city) => {
    return axios.get('/xuanzhi/api/region',{'province':province,'city':city})
};
export const getIndusty = () => {
    return axios.get('/xuanzhi/api/industy')
};
export const getAddress = (province, city, district, industy) =>{
    return axios.post('/xuanzhi/api/industyrecomend',{"province":province, "city":city, "district":district, "industy":industy})
}