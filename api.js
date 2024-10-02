import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { createServer } from 'http';
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

app.get('/api/obtenerInventario')


//Casos de uso del gerente
app.post('/api/createUser', (req, res) => {
    const { id, name, email, password, phone, type, address } = req.body
    db.run('INSERT INTO users(id, name, email, password, phone, type, address) VALUES(?, ?, ?, ?, ?, ?, ?)', [id, name, email, password, phone, type, address], (err,) => {
        if(err){
            res.status(500).send('Error del servidor')
        }else{
            res.status(200).send('Creado con exito')
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

app.delete('/api/deleteUser')
app.get('/api/reportes')

//Casos de uso del empleado
app.post('api/registrarCompra')
app.post('/api/agregarProducto')
app.put('api/editarProducto')
app.delete('api/eliminarProducto')
app.get('/api/emitirFactura')

const server = createServer(app);

server.listen(port, () => {
    console.log(`Puerto: ${port}`)
})