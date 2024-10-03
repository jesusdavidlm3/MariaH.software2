import axios from "axios"

const url = 'http://localhost:3000'

export async function login(data){
    try{
        let res = await axios.post(`${url}/api/login`, data)
        return res
    }catch(err){
        return err
    }

}

export async function createUser(data){
    try{
        let res = await axios.post(`${url}/api/createUser`, data)
        return res
    }catch(err){
        return err
    }
}

export async function getEmployes(){
    try{
        let res = await axios.get(`${url}/api/getEmployes`)
        return res
    }catch(err){
        return err
    }
}

export async function deleteUser(id){
    try{
        let res = await axios.delete(`${url}/api/deleteUser/${id}`)
        return res
    }catch(err){
        return err
    }
}