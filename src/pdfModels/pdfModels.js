import doc from 'pdfkit'
import PDFDocument from 'pdfkit'

function buildInvoice(){
    const pdf = new PDFDocument(dataCallback, endCallback, info)

    doc.on('data', dataCallback)
    doc.on('end', endCallback)

    doc.text('Factura')
}