import axios from 'axios'

export const httpRequest = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
})
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options)
    return response.data
}