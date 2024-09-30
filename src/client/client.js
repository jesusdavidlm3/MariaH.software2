import axios from "axios"

const url = 'http://localhost:3000'

export async function login(data){
    let res = await axios.post(`${url}/api/login`, data)
    return res
}