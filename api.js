import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { createServer } from 'http';
import { v4 as idGenerator } from 'uuid';
// import { encrypt } from './src/functions/hash'

const app = Express();
const port = 3000;
const db = new sqlite3.Database('db.db')

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(Express.json()) // for parsing application/json
app.use(Express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors());

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if(err){
            res.status(500).send('Error del servidor')
        }else if(!user){
            res.status(401).send('Este usuario no existe')
        }else if(user.password == password){
            res.status(200).send(user)
        }else{
            res.status(403).send('Contraseña incorrecta')
        }
    })
})

app.get('/api/obtenerInventario', (req, res) => {
    db.all('SELECT * FROM products', (err, productList) => {
        if(err){
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send(productList)
        }
    })
})

app.get('/api/paymentMethods', (req, res) => {
    db.all('SELECT * FROM paymentMethods', (err, list) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send(list)
        }
    })
})

//Casos de uso del gerente
app.post('/api/createUser', (req, res) => {
    const { id, name, email, password, phone, type, address } = req.body
    db.run('INSERT INTO users(id, name, email, password, phone, type, address) VALUES(?, ?, ?, ?, ?, ?, ?)', [id, name, email, password, phone, type, address], (err) => {
        if(err){
            res.status(500).send('Error del servidor')
        }else{
            res.status(200).send('Creado con exito')
        }
    })
})

app.delete('/api/deleteUser/:id', (req, res) => {
    const id = req.params.id
    db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
        if(err){
            res.status(500).send('Error del servidor')
        }else{
            res.status(200).send('Eliminado con exito')
        }
    })
})

app.patch('/api/editUser', (req, res) => {
    const { id, name, email, phone, type, address } = req.body
    db.run('UPDATE users SET name = ?, email = ?, phone = ?, type = ?, address = ? WHERE id = ?', [name, email, phone, type, address, id], (err) => {
        if(err){
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send('editado con exito')
        }
    })
})

app.get('/api/getEmployes', (req, res) => {
    db.all('SELECT * FROM users WHERE type = 0 OR type = 1', (err, users) => {
        if(err){
            res.status(500).send('Error del servidor')
        }else{
            res.status(200).send(users)
        }
    })
})

app.get('/api/getClients', (req, res) => {
    db.all('SELECT * FROM users WHERE type = 2', (err, users) => {
        if(err){
            res.status(500).send('Error del servidor')
        }else{
            res.status(200).send(users)
        }
    })
})


app.get('/api/reportes')  //pendiente (generar reportes)

//Casos de uso del empleado
app.post('/api/registrarCompra', (req, res) => {
    const {date, paymentMethod, employeId, clientId, products} = req.body
    const id = idGenerator()
    db.run(`INSERT INTO facturas(id, date, paymentMethod, employeId, clientId) VALUES(?, ?, ?, ?, ?)`,[id, date, paymentMethod, employeId, clientId] ,(err) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            try{
                const insertProducts = db.prepare('INSERT INTO productosFacturas(facturaId, productoId, quantity) VALUES(?, ?, ?)')
                products.forEach(item => {
                    insertProducts.run([id, item.id, item.quantity])
                });
                insertProducts.finalize()
                res.status(200).send('factura realizada con exito')
            }catch(err){
                console.log(err)
                res.status(500).send('error del servidor')
            }
        }
    })
})

app.post('/api/checkCliente', (req, res) => {
    const {id} = req.body
    db.get(`SELECT * FROM users WHERE id = ${id}`, (err, user) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else if(!user){
            res.status(404).send('cliente no encontrado')
        }else{
            res.status(200).send(user)
        }
    })
})

app.post('/api/agregarProducto', (req, res) => {
    const {id, name, quantity, price} = req.body
    db.run('INSERT INTO products(id, name, quantity, price) VALUES(?, ?, ?, ?)', [id, name, quantity, price], (err) => {
        if(err){
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send('Agregado correctamente')
        }
    })
})

app.patch('/api/editarProducto', (req, res) => {
    const {id, name, quantity, price} = req.body
    db.run('UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?', [name, quantity, price, id], (err) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send('editado correctamente')
        }
    })
})

app.delete('/api/eliminarProducto/:id', (req, res) => {
    const id = req.params.id
    db.run('DELETE FROM products WHERE id = ?', [id], (err) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send('eliminado correctamente')
        }
    })
})
app.get('/api/emitirFactura')   //pendiente (Generar facturas)

const server = createServer(app);

server.listen(port, () => {
    console.log(`Puerto: ${port}`)
})