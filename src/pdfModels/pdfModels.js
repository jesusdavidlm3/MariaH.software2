import PDFDocument from 'pdfkit'
// import { dollarPrice } from "../context/constants"

export function buildInvoice(dataCallback, endCallback, data){
    const doc = new PDFDocument()
    let total = 0

    doc.on('data', dataCallback)
    doc.on('end', endCallback)

    doc.image('./src/img/1.png', 185, 20, {width: 250, align: 'center', valign: 'center'}).stroke()
    doc.fontSize(60).text(' ')
    doc.fontSize(50).text('Factura', {align: 'center'})
    doc.fontSize(15).text(`Factura Nro: ${data.idFactura}`)
    doc.text(`Cliente: ${data.clientName}`)
    doc.text(`Atendido por: ${data.employeName}`)
    doc.text(`Fecha: ${data.date}`)
    doc.text(' ')
    doc.fontSize(20).text('-------------------------------------------------------------', {align: 'center'})
    doc.fontSize(15)

    data.products.forEach(item => {
        doc.text(`Cod. ${item.id} | X${item.quantity} | $${item.price}`)
        doc.text(`${item.name} | $${Number(item.quantity) * Number(item.price)}`)
        doc.text(' ')
    });

    data.products.forEach(item => {
        total = total + (item.quantity * item.price)
    });

    doc.fontSize(20).text('-------------------------------------------------------------', {align: 'center'})
    doc.fontSize(20).text(`Subtotal: $${total}`, {align: 'right'})
    doc.fontSize(20).text(`IVA (16%): $${total * 0.16}`, {align: 'right'})
    doc.fontSize(30).text(`Total: $${total + (total * 0.16)}`, {align: 'right'})
    // doc.fontSize(30).text(`Total: Bs. ${(total + (total * 0.16) * dollarPrice)}`, {align: 'right'})
    doc.fontSize(15).text(`Metodo de pago: ${data.paymentMethod}`, {align: 'center'})

    doc.end()
}

export function buildInventoryReport(dataCallback, endCallback, data){
    const doc = new PDFDocument()

    doc.on("data", dataCallback)
    doc.on("end", endCallback)

    doc.image('./src/img/1.png', 185, 20, {width: 250, align: 'center', valign: 'center'}).stroke()
    doc.fontSize(60).text(' ')
    doc.fontSize(50).text('Reporte de inventario', {align: 'center'})
    doc.fontSize(10).text(`Fecha: ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`)

    doc.text(' ')
    doc.fontSize(20).text('-------------------------------------------------------------', {align: 'center'})
    doc.fontSize(15)

    data.forEach(item => {
        doc.text(`Cod. ${item.id}`)
        doc.text(`Nombre: ${item.name}`)
        doc.text(`Cantidad: ${item.quantity} unidades`)
        doc.text(`Precio: $${item.price}`)
        doc.fontSize(20).text('-------------------------------------------------------------', {align: 'center'})
        doc.fontSize(15).text(' ')
    })

    doc.end()
}   

export const buildGeneralReport = (dataCallback, endCallback, info) => {
    const doc = PDFDocument()

    doc.on('data', dataCallback)
    doc.on('end', endCallback)

    doc.image('./src/img/1.png', 185, 20, {width: 250, align: 'center', valign: 'center'}).stroke()
    doc.fontSize(60).text(' ')
    doc.fontSize(50).text('Reporte general de ventas')
    doc.fontSize(10).text(`Fecha: ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`)
    doc.text(' ')
    
    doc.fontSize(20).text('-------------------------------------------------------------', {align: 'center'})
    doc.fontSize(15)

    doc.text('Total de ventas realizadas: ')
    doc.text('Total de ganancia: ')
    doc.text('Productos vendidos: ')

    doc.end()
}