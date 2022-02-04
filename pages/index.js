/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head'
import Image from 'next/image'
import { PDFDocument } from 'pdf-lib'
import { useState } from 'react'
import download from 'downloadjs'

export default function Home() {
  const [invoiceNumber, setIN] = useState("")
  const [contractNumber, setCN] = useState("")
  const [quantityField, setQ] = useState("")
  const [descriptionField, setD] = useState("")
  const [priceField, setP] = useState("")
  const [phoneField, setPF] = useState("")
  const [adressField, setAF] = useState("")
  const { PDFDocument } = require('pdf-lib')
  const [emailField, setEF] = useState("")

  const handleSubmit = (event, IN,CN,Q,D,P,PF,AF,EF) => {
    event.preventDefault();
    console.log('rendering pdf')
    fillForm(IN,CN,Q,D,P,PF,AF,EF)
  }

  async function fillForm(IN,CN,Q,D,P,PF,AF,EF) {
    const formUrl = 'https://i.file.glass/uwJ5gaW2gi.pdf'
    const formPdfBytes = await fetch('https://i.file.glass/uwJ5gaW2gi.pdf').then(res => res.arrayBuffer())
      // Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes)

      // Get the form containing all the fields
      const form = pdfDoc.getForm()

      const invoiceNumber = form.getTextField('invoice-number')
      const contractNumber = form.getTextField('contract-number')
      const quantityField = form.getTextField('q')
      const descriptionField = form.getTextField('description')
      const priceField = form.getTextField('price')
      const phoneField = form.getTextField('phone')
      const adressField = form.getTextField('adress')
      const emailField = form.getTextField('email')

      // Fill in the basic info fields
      invoiceNumber.setText(IN)
      contractNumber.setText(CN)
      quantityField.setText(Q)
      descriptionField.setText(D)
      priceField.setText(P)
      phoneField.setText(PF)
      adressField.setText(AF)
      emailField.setText(EF)
      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()

			// Trigger the browser to download the PDF document
      download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
  }

  return (
    <div>
      <Head>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://unpkg.com/downloadjs@1.4.7"></script>
      </Head>
      <h1>Please fill in these fields:</h1>
    
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">Invoice Number:</label>
        <input type="text" value={invoiceNumber} onChange={(e) => setIN(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="00001" required=""/>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">Contract Number:</label>
        <input type="text" value={contractNumber} onChange={(e) => setCN(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""/>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Quantity:
        </label>
        <input type="text" value={quantityField} onChange={(e) => setQ(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""/>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Description:
        </label>
        <input type="text" value={descriptionField} onChange={(e) => setD(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""/>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Price:
        </label>
        <input type="text" value={priceField} onChange={(e) => setP(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""/>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Your Phone Number:
        </label>
        <input type="text" value={phoneField} onChange={(e) => setPF(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""/>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Your Adress:
        </label>
        <input type="text" value={adressField} onChange={(e) => setAF(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""/>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Your Email:
        </label>
        <input type="text" value={emailField} onChange={(e) => setEF(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""/>
      </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
    </form>

    </div>
  )
}
