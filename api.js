import Express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { createServer } from 'http';
import { v4 as idGenerator } from 'uuid';
import { buildInvoice, buildInventoryReport } from './src/pdfModels/pdfModels.js';

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

app.get('/api/getInventoryReport', (req, res) => {
    db.all('SELECT * FROM products', (err, list) => {
        const stream = res.writeHead(200, {
            "Content-Type": "aplication/pdf",
            "Content-Disposition": "attachment; filename=reporte.pdf"
        })

        buildInventoryReport(
            (data) => stream.write(data),
            () => stream.end(),
            list
        )
    })
})

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
                res.status(200).send({message: 'Factura realizada con exito', id: id})
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

app.post('/api/emitirFactura', (req, res) => {
    const {id} = req.body

    try{
        db.get('SELECT * FROM facturas WHERE id = ?', [id], (err, factura) => {
            db.get('SELECT * FROM paymentMethods WHERE id = ?', [factura.paymentMethod], (err, paymentMethod) => {
                db.get('SELECT * FROM users WHERE id = ?', [factura.employeId], (err, employe) => {
                    db.get('SELECT * FROM users WHERE id = ?', [factura.clientId], (err, client) => {
                        db.all('SELECT productosFacturas.facturaId, products.id, productosFacturas.quantity, products.name, products.price FROM productosFacturas INNER JOIN products ON productosFacturas.productoId = products.id WHERE productosFacturas.facturaId = ?', [factura.id], (err, products) => {
                            const pdfData = {
                                idFactura: factura.id,
                                date: factura.date,
                                paymentMethod: paymentMethod.name,
                                employeName: employe.name,
                                clientName: client.name,
                                products: products
                            }
                            const stream = res.writeHead(200, {
                                "Content-Type": "aplication/pdf",
                                "Content-Disposition": "attachment; filename=invoice.pdf"
                            })
                            buildInvoice(
                                (data) => stream.write(data),
                                () => stream.end(),
                                pdfData
                            )

                        })
                    })
                })
            })
            
        })
    }catch(err){
        console.log(err)
        res.status(500).send('error del servidor')
    }
})

const server = createServer(app);

server.listen(port, () => {
    console.log(`Puerto: ${port}`)
})