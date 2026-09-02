import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AlertCircle } from "lucide-react";

import { URL_API_DATA } from "@/utils/contanst";
import { Card } from "@/components/ui/card";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PropsData {
  doc: string,
  typedoc: string,
  fechaE?: string,
  nombres?: string,
}

interface Information {
  email: string,
  doc: number,
  jobid: string,
  nombre: string,
  typedoc: string,
  validado: boolean
}

interface DataResponse {
  message: string,
  data: Information,
}

const fetchData = async (sendInfo: PropsData) => {
  try {
    //const response = await axios.post<DataResponse>(`${URL_API_DATA}/tus-datos/launch`, sendInfo)
    const response = await axios.post<DataResponse>(`${URL_API_DATA}/tus-datos/launch`, sendInfo)
    return response.data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export default function TusDatos() {
  const [data, setData] = useState<Information | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<PropsData>({
    doc: "",
    typedoc: "",
    fechaE: "",
    nombres: ""
  })

  const handleFetchData = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    setLoading(true)
    setError(null)

    if (!formData.doc || !formData.typedoc) {
      setError("Tipo de documento y número de documento son obligatorios")
      setLoading(false)
      return
    }

    const fechaExp = formData.fechaE ? new Date(formData.fechaE).toISOString() : undefined;
    const nombresSend = formData.nombres ? formData.nombres : undefined;

    try {
      const result = await fetchData({
        doc: formData.doc,
        typedoc: formData.typedoc,
        fechaE: fechaExp,
        nombres: nombresSend
      })

      console.log(result);
      setData(result.data)
    } catch (error) {
      console.log("Error fetching data:", error);
      setError("Error fetching data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-lg border-0 bg-white">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
            <h1 className="text-3xl font-bold">Consulta de Datos Personales</h1>
            <p className="text-blue-100 mt-2">Ingrese sus datos para obtener información</p>
          </div>
          
          <div className="px-6">
            <form onSubmit={handleFetchData} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <div className="space-y-2">
                <Label htmlFor="typedoc" className="text-sm font-semibold text-gray-700">
                  Tipo de Documento <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.typedoc} onValueChange={(value) => setFormData({ ...formData, typedoc: value })}>
                  <SelectTrigger className="w-full h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Seleccione Tipo Documento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                      <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc" className="text-sm font-semibold text-gray-700">
                  Número de Documento <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="doc"
                  name="doc"
                  placeholder="1118*******"
                  className="w-full h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.doc}
                  onChange={(e) => setFormData({ ...formData, doc: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="fechaE" className="text-sm font-semibold text-gray-700">
                    Fecha de Expedición
                  </Label>
                  <div className="group relative">
                    <AlertCircle className="text-blue-400 h-4 w-4 cursor-help" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Campo opcional
                    </div>
                  </div>
                </div>
                <Input
                  id="fechaE"
                  name="fechaE"
                  type="date"
                  className="w-full h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.fechaE}
                  onChange={(e) => setFormData({ ...formData, fechaE: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="nombres" className="text-sm font-semibold text-gray-700">
                    Nombres
                  </Label>
                  <div className="group relative">
                    <AlertCircle className="text-blue-400 h-4 w-4 cursor-help" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Campo opcional
                    </div>
                  </div>
                </div>
                <Input
                  id="nombres"
                  name="nombres"
                  placeholder="Ingrese nombres"
                  className="w-full h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.nombres}
                  onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                />
              </div>

              <div className="flex flex-col justify-end">
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
                  disabled={loading}
                >
                  {loading ? "Consultando..." : "Consultar Datos"}
                </Button>
              </div>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>
        </Card>

        {data && (
          <Card className="mt-8 shadow-lg border-0 bg-white">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-lg">
              <h2 className="text-2xl font-bold">Información Encontrada</h2>
              <p className="text-green-100 mt-2">Datos asociados al documento consultado</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Email</p>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{data.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Documento</p>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{data.doc}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Job ID</p>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{data.jobid}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Nombre</p>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{data.nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Tipo de Documento</p>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{data.typedoc}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Estado de Validación</p>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        data.validado 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {data.validado ? "✓ Validado" : "✗ No Validado"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
