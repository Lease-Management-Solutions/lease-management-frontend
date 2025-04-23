'use client'

import React from 'react'
import { usePropertyContext } from '@/app/contexts/PropertyContext'

export const DataProperty = () => {
  const { dataPropertyDocs, setDataPropertyDocs, attachment, setAttachment } = usePropertyContext()

  const handleChangeDocs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataPropertyDocs(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'matricula' | 'agua' | 'energia' | 'iptu') => {
    const file = e.target.files?.[0]
    if (!file) return

    const newAttachment = {
      type,
      filePath: URL.createObjectURL(file)
    }

    setAttachment(prev => [...prev.filter(a => a.type !== type), newAttachment])
  }

  return (
    <div className="flex flex-col items-center gap-4 overflow-y-auto max-h-full">
      {/* Grupo 1 - Código da água */}
      <div className="w-full mt-10 flex flex-wrap gap-4">
        <label className="w-full md:w-5/12">
          Código da água
          <input
            type="text"
            name="waterCode"
            value={dataPropertyDocs.waterCode || ''}
            onChange={handleChangeDocs}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-5/12">
          Anexo
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={(e) => handleFileChange(e, 'agua')}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>

      {/* Grupo 2 - Código da energia */}
      <div className="w-full mt-10 flex flex-wrap gap-4">
        <label className="w-full md:w-5/12">
          Código da energia
          <input
            type="text"
            name="energyCode"
            value={dataPropertyDocs.energyCode || ''}
            onChange={handleChangeDocs}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-5/12">
          Anexo
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={(e) => handleFileChange(e, 'energia')}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>

      {/* Grupo 3 - Código do IPTU */}
      <div className="w-full mt-10 flex flex-wrap gap-4">
        <label className="w-full md:w-5/12">
          Código do IPTU
          <input
            type="text"
            name="iptuCode"
            value={dataPropertyDocs.iptuCode || ''}
            onChange={handleChangeDocs}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-5/12">
          Anexo
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={(e) => handleFileChange(e, 'iptu')}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>

      {/* Grupo 4 - Número da matrícula */}
      <div className="w-full mt-10 flex flex-wrap gap-4">
        <label className="w-full md:w-5/12">
          Número da matrícula
          <input
            type="text"
            name="registrationNumber"
            value={dataPropertyDocs.registrationNumber || ''}
            onChange={handleChangeDocs}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-5/12">
          Anexo
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={(e) => handleFileChange(e, 'matricula')}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>
    </div>
  )
}