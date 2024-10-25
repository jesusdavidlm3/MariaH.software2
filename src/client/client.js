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

export async function deleteUser(id){
    try{
        let res = await axios.delete(`${url}/api/deleteUser/${id}`)
        return res
    }catch(err){
        return err
    }
}

export async function editUser(data) {
    try{
        let res = axios.patch(`${url}/api/editUser`, data)
        return res
    }catch(err){
        return res
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

export async function getClients(){
    try{
        let res = await axios.get(`${url}/api/getClients`)
        return res
    }catch(err){
        return err
    }
}

export async function getInventory(){
    try{
        let res = await axios.get(`${url}/api/obtenerInventario`)
        return res
    }catch(err){
        return err
    }
}

export async function addProduct(data) {
    try{
        let res = await axios.post(`${url}/api/agregarProducto`, data)
        return res
    }catch(err){
        return res
    }
}

export async function deleteProduct(id) {
    try{
        let res = await axios.delete(`${url}/api/eliminarProducto/${id}`)
        return res
    }catch(err){
        return err
    }
}

export async function editProduct(data) {
    try{
        let res = await axios.patch(`${url}/api/editarProducto`, data)
        return res
    }catch(err){
        return res
    }
}

export async function getPaymentMethods(){
    try{
        let res = await axios.get(`${url}/api/paymentMethods`)
        return res
    }catch(err){
        return err
    }
}

export async function checkCliente(data){
    try{
        let res = await axios.post(`${url}/api/checkCliente`, data)
        return res
    }catch(err){
        return err
    }
}

export async function submitInvoice(data){
    try{
        let res = await axios.post(`${url}/api/registrarCompra`, data)
        return res
    }catch(err){
        return err
    }
}

export async function printInvoice(data){
    try{
        let res = await axios.post(`${url}/api/emitirFactura`, data, {responseType: 'blob'})
        return res
    }catch(err){
        return err
    }
}