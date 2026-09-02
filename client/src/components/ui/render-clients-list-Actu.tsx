import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Cliente } from '@/types/Interfaces';
import { Mail, Phone, User, FileText, MapPin, Check, ListChecks } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Categorizacion, TipoZona } from '@/utils/contanst'

interface Props {
  clientes: Cliente[];
  seleccionados: string[];
  setSeleccionados: React.Dispatch<React.SetStateAction<string[]>>;
}

export const RenderClientsActu = ({
  clientes,
  seleccionados,
  setSeleccionados }: Props) => {

  const [categoriaGlobal, setCategoriaGlobal] = useState('');
  const [zonaGlobal, setZonaGlobal] = useState('');

  const toggleSeleccion = (DOCUMENTO: string) => {
    setSeleccionados(prev => {
      if (prev.includes(DOCUMENTO)) {
        return prev.filter(x => x !== DOCUMENTO);
      }

      if (prev.length >= 100) {
        toast.warning('Solo puedes seleccionar hasta 100 clientes');
        return prev; // 👈 no agregamos más
      }

      return [...prev, DOCUMENTO];
    });
  };

  const seleccionarTodos = () => {
    const docs = clientes.map(c => c.DOCUMENTO);
    const todosSeleccionados = docs.every(d => seleccionados.includes(d));

    if (todosSeleccionados) {
      setSeleccionados(prev => prev.filter(d => !docs.includes(d)));
    } else {
      setSeleccionados(prev => {
        const nuevos = docs.filter(d => !prev.includes(d));
        const total = prev.length + nuevos.length;

        if (total > 100) {
          const permitidos = nuevos.slice(0, 100 - prev.length);
          toast.warning(`Solo se pueden seleccionar ${100} clientes en total`);
          return [...prev, ...permitidos];
        }

        return [...prev, ...nuevos];
      });
    }
  };


  const handleSubmit = () => {

    if (!categoriaGlobal && !zonaGlobal && !seleccionados) {
      toast.warning('Los Campos categoría y tipo de zona son obligatorios');
      return;
    }

    //axios.post(`${URL_API_DATA}/updateClienteMasivos`, { categoria, tipozona, seleccionados })
    axios.post(`http://10.98.98.104:4020/updateClienteMasivos`, {
      seleccionados: seleccionados,      // 👈 todos los documentos seleccionados
      categoria: categoriaGlobal,     // 👈 valor global seleccionado
      tipozona: zonaGlobal            // 👈 valor global seleccionado
    })
      .then(res => {
        console.log(res)
        toast.success('Cliente actualizado correctamente', { description: 'Cambio de información del cliente' });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch(error => {
        console.error('Error updating client:', error)
        toast.error('Error al actualizar cliente', { description: 'Cambio de información del cliente' });
      });
  }

  if (!clientes || clientes.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-center'>
        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
          <User size={32} className='text-gray-400' />
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          No hay clientes disponibles
        </h3>
        <p className='text-gray-500'>
          No se encontraron clientes que coincidan con los criterios de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center mb-4 mt-3">
        {seleccionados.length > 0 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="categoria" className="flex items-center gap-2 font-medium">
                <User size={16} />
                Categoría *
              </Label>
              <Select defaultValue="null" name="categoria" onValueChange={(value) => setCategoriaGlobal(value)}>
                <SelectTrigger id="categoria" className="w-full">
                  <SelectValue placeholder="Seleccione una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {Categorizacion.map((item, index) => (
                    <SelectItem key={index} value={item.value || 'ninguno'}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipozona" className="flex items-center gap-2 font-medium">
                <MapPin size={16} />
                Tipo de zona *
              </Label>
              <Select defaultValue="null" name="tipozona" onValueChange={(value) => setZonaGlobal(value)}>
                <SelectTrigger id="tipozona" className="w-full">
                  <SelectValue placeholder="Seleccione tipo de zona" />
                </SelectTrigger>
                <SelectContent>
                  {TipoZona.map((item, index) => (
                    <SelectItem key={index} value={item.value || 'ninguno'}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 flex justify-center">
              <Button
                disabled={!seleccionados.length && !categoriaGlobal && !zonaGlobal}
                className="cursor-pointer bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 w-4/12"
                onClick={handleSubmit}
              >
                Actualizar seleccionados
              </Button>
            </div>
          </>
        ) : (
          <h1 className="md:col-span-2 flex justify-center items-center gap-2 font-bold truncate">
            Selecciona uno <Check /> o varios  <ListChecks />clientes para actualizar
          </h1>
          
        )}
      </div>


      <Table>
        <TableHeader>
          <TableRow className='bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100'>

            <TableHead className='font-semibold text-gray-800'>
              <div className='flex items-center gap-2'>
                <User size={16} />
                Nombre
              </div>
            </TableHead>
            <TableHead className='font-semibold text-gray-800'>
              <div className='flex items-center gap-2'>
                <FileText size={16} />
                Documento
              </div>
            </TableHead>
            <TableHead className='font-semibold text-gray-800'>
              <div className='flex items-center gap-2'>
                <Phone size={16} />
                Teléfono
              </div>
            </TableHead>
            <TableHead className='font-semibold text-gray-800'>
              <div className='flex items-center gap-2'>
                <Mail size={16} />
                Correo
              </div>
            </TableHead>
            <TableHead className='font-semibold text-gray-800'>Categoría</TableHead>
            <TableHead className='font-semibold text-gray-800'>
              <div className='flex items-center gap-2'>
                <MapPin size={16} />
                Tipo Zona
              </div>
            </TableHead>
            <TableHead className='font-semibold text-gray-800 text-center'>
              <div className="flex flex-col items-center justify-center gap-1">
                Acciones
                <input
                  type='checkbox'
                  checked={clientes.length > 0 && clientes.every(c => seleccionados.includes(c.DOCUMENTO))}
                  onChange={seleccionarTodos}
                  className="flex w-5 h-5 accent-blue-600 cursor-pointer"
                />
              </div>

            </TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>
          {clientes.map((item, index) => (
            <TableRow
              key={item.DOCUMENTO}
              className={`
                hover:bg-gray-50 transition-colors duration-150
                ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                ${seleccionados.includes(item.DOCUMENTO) ? 'bg-blue-100' : ''}
              `}
            >
              {/* ✅ Checkbox por fila */}

              <TableCell className='font-medium text-gray-900'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
                    <span className='text-white text-sm font-medium'>
                      {item.NOMBRES?.charAt(0).toUpperCase() || 'N'}
                    </span>
                  </div>
                  <span className='truncate max-w-[200px]'>
                    {item.NOMBRES || 'N/A'}
                  </span>
                </div>
              </TableCell>

              <TableCell className='text-gray-700 font-mono text-sm'>
                {item.DOCUMENTO}
              </TableCell>

              <TableCell className='text-gray-700'>
                {item.TELEFONO1 ? (
                  <div className='flex items-center gap-1'>
                    <Phone size={14} className='text-gray-400' />
                    <span>{item.TELEFONO1}</span>
                  </div>
                ) : (
                  <span className='text-gray-400'>N/A</span>
                )}
              </TableCell>

              <TableCell className='text-gray-700'>
                {item.EMAIL ? (
                  <div className='flex items-center gap-1 max-w-[200px]'>
                    <Mail size={14} className='text-gray-400' />
                    <span className='truncate text-sm'>{item.EMAIL}</span>
                  </div>
                ) : (
                  <span className='text-gray-400'>N/A</span>
                )}
              </TableCell>

              <TableCell>
                <span
                  className={`
                    px-2 py-1 text-xs font-medium rounded-full
                    ${item.CATEGORIA === 'VIP'
                      ? 'bg-purple-100 text-purple-800'
                      : item.CATEGORIA === 'PREMIUM'
                        ? 'bg-yellow-100 text-yellow-800'
                        : item.CATEGORIA === 'REGULAR'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }
                  `}
                >
                  {item.CATEGORIA || 'N/A'}
                </span>
              </TableCell>

              <TableCell className='text-gray-700'>
                <div className='flex items-center gap-1'>
                  <MapPin size={14} className='text-gray-400' />
                  <span>{item.TIPOZONA || 'N/A'}</span>
                </div>
              </TableCell>

              <TableCell className='text-center'>
                <input
                  type='checkbox'
                  checked={seleccionados.includes(item.DOCUMENTO)}
                  onChange={() => toggleSeleccion(item.DOCUMENTO)}
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
