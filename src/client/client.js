import axios from "axios"

const url = 'http://localhost:3000'

export async function login(data){
    let res = await axios.post(`${url}/api/login`, data)
    return res
}

export async function createUser(data){
    try{
        let res = await axios.post(`${url}/api/createUser`, data)
        return res
    }catch(err){
        return(err)
    }
}