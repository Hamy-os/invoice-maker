/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head'
import Image from 'next/image'
import { PDFDocument } from 'pdf-lib'
import { useState } from 'react'
import download from 'downloadjs'

export default function Home() {
  const [IN, setIN] = useState("")
  const [CN, setCN] = useState("")
  const [Q, setQ] = useState("")
  const [D, setD] = useState("")
  const [P, setP] = useState("")
  const [PF, setPF] = useState("")
  const [AF, setAF] = useState("")
  const [EF, setEF] = useState("")
  const { PDFDocument } = require('pdf-lib')

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('rendering pdf')
    console.log(IN + CN + Q + D + P + PF + AF + EF)
    fillForm(IN,CN,Q,D,P,PF,AF,EF)
  }

  async function fillForm(IN,CN,Q,D,P,PF,AF,EF) {
      const formUrl = 'https://raw.githubusercontent.com/Hamy-os/invoice-maker/main/public/pdfbase.pdf'
      const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(formPdfBytes)
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

      const pdfBytes = await pdfDoc.save()
      download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
  }

  return (
    <div>
            <div><a href="/private">Go to Private</a></div>
      <h1 className="text-center m-10">Please fill in these fields:</h1>

      <form onSubmit={handleSubmit}>
    <div className="bg-white shadow rounded-lg p-6">
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
      <label className="bg-white text-gray-600 px-1">
        Invoice Number:
      </label>
      <p>
        <input type="text" value={IN} onChange={(e) => setIN(e.target.value)} className="py-1 px-1 text-gray-900 outline-none block h-full w-full" placeholder="00001" required=""/>
      </p>
      </div>
      <div className="bg-grey-500 border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
        <label className=" text-gray-600 px-1">
          Your Email:
        </label>
        <p>
          <input type="email" value={EF} onChange={(e) => setEF(e.target.value)} className="bg-grey-500 py-1 px-1 text-gray-900 outline-none block h-full w-full" placeholder="example@example.com" required=""/>
        </p>
      </div>
      <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
      <label className="bg-white text-gray-600 px-1">
          Your Adress:
        </label>
        <p>
        <input type="text" value={AF} onChange={(e) => setAF(e.target.value)} className="py-1 px-1 text-gray-900 outline-none block h-full w-full" placeholder="City Center Doha Qatar" required=""/>
        </p>
      </div>
      <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
      <label className="bg-white text-gray-600 px-1">
          Your Phone Number:
        </label>
        <p>
        <input type="text" value={PF} onChange={(e) => setPF(e.target.value)} className="py-1 px-1 text-gray-900 outline-none block h-full w-full" placeholder="5050 5099" required=""/>
        </p>
      </div>
      <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
      <label className="bg-white text-gray-600 px-1">
          Price:
        </label>
        <p>
        <input type="text" value={P} onChange={(e) => setP(e.target.value)}  className="py-1 px-1 text-gray-900 outline-none block h-full w-full" placeholder="600" required=""/>
        </p>
        </div>
      <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
      <label className="bg-white text-gray-600 px-1">
          Description:
        </label>
        <p>
        <input type="text" value={D} onChange={(e) => setD(e.target.value)}  className="py-1 px-1 text-gray-900 outline-none block h-full w-full" placeholder="Tour guide service provided for discover qatar (MSC) 1st January 2022" required=""/>
        </p>
        </div>
      <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
      <label className="bg-white text-gray-600 px-1">
          Quantity:
        </label>
        <p>
          <input type="text" value={Q} onChange={(e) => setQ(e.target.value)} className="py-1 px-1 text-gray-900 outline-none block h-full w-full" placeholder="1" required=""/>
        </p>
      </div>
      <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
      <label className="bg-white text-gray-600 px-1">
        Contract Number:
      </label>
      <p>
        <input type="text" value={CN} onChange={(e) => setCN(e.target.value)} className="py-1 px-1 text-gray-900 outline-none block h-full w-full" placeholder="QTR-CNT-2022-0001" required=""/>
      </p>
      </div>

    </div>
    <div className="border-t mt-6 pt-3">
      <button  type="submit" className="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300">
        Save
      </button>
    </div>
  </div>
  </form>
  

    </div>
  )
}
