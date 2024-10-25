import PDFDocument from 'pdfkit'

export function buildInvoice(dataCallback, endCallback, data){
    const doc = new PDFDocument()
    let total = 0

    doc.on('data', dataCallback)
    doc.on('end', endCallback)

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
    doc.fontSize(30).text(`Total: $${total}`, {align: 'right'})
    doc.fontSize(15).text(`Metodo de pago: ${data.paymentMethod}`, {align: 'center'})

    doc.end()
}