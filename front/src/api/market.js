import axiosInstance from "./index"
const axios = axiosInstance
export const getMarket = (date) => {
    return axios.get(`/api/dump?date=${date}`)
}
export const crashrate = () =>{
  return axios.get(`/api/crashrate`)
}
export const compareCrash = (params) => {
  if(params.startdate && params.enddate){
    return  axios.get(`/api/compareCrash?startdate=${params.startdate}&enddate=${params.enddate}`)
  }
    return axios.get(`/api/compareCrash`)
}
