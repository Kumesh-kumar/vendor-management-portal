import axios from 'axios'

const BASE_URL = 'http://localhost:5000/vendors'

export const getVendors = async () => {
    const response = await axios.get(BASE_URL)
    return response.data
}