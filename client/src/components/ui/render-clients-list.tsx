import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Cliente } from '@/types/Interfaces';
import { useNavigate } from 'react-router';
import { Edit, Mail, Phone, User, FileText, MapPin } from 'lucide-react';
import { Button } from './button';

export const RenderClients = ({ clientes } : { clientes: Cliente[] }) => {
  const navigate = useNavigate();

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
            <TableHead className='font-semibold text-gray-800 text-center'>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((item, index) => (
            <TableRow 
              key={item.DOCUMENTO} 
              className={`
                hover:bg-gray-50 transition-colors duration-150
                ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
              `}
            >
              <TableCell className='font-medium text-gray-900'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
                    <span className='text-white text-sm font-medium'>
                      {item.NOMBRES?.charAt(0).toUpperCase() || 'N'}
                    </span>
                  </div>
                  <span className='truncate max-w-[200px]'>{item.NOMBRES || 'N/A'}</span>
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
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${item.CATEGORIA === 'VIP' ? 'bg-purple-100 text-purple-800' :
                    item.CATEGORIA === 'PREMIUM' ? 'bg-yellow-100 text-yellow-800' :
                    item.CATEGORIA === 'REGULAR' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }
                `}>
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
                <Button 
                  className='cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold px-4 py-2 rounded-lg transition-colors duration-200'
                  onClick={() => navigate(`/editar-cliente/${item.DOCUMENTO}`)} 
                  variant={'outline'}
                >
                  <Edit size={14} />
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}