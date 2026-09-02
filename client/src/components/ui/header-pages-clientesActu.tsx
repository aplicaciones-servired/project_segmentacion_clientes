import { SelectCantidadClientes } from './select-can-clientes';
import { Search, Users } from 'lucide-react';

interface PropsHeader {
  totalClients: number;
  search: string;
  handleSearch: (value: string) => void;
  searchActu: string;
  handleSearchActu: (value: string) => void;
  handlePageSizeChange: (number: number) => void;
  title?: string;
}

export function HeaderPagesClientesActu({ totalClients, search, handleSearch, searchActu, handleSearchActu, handlePageSizeChange, title }: PropsHeader) {
  return (
    <header className='bg-white border-b border-gray-200 shadow-sm'>
      <div className='px-6 py-4'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>

          {/* Title and Client Count */}
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center'>
                <Users size={20} className='text-white' />
              </div>
              <div>
                <h1 className='text-xl font-bold text-gray-800'>
                  {title || 'Gestión Clientes'}
                </h1>
                <p className='text-sm text-gray-500'>Administra y consulta la base de datos de clientes</p>
              </div>
            </div>

            <div className='flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg'>
              <Users size={16} className='text-blue-600' />
              <span className='text-sm font-medium text-blue-700'>Total:</span>
              <span className='text-sm font-bold text-blue-800'>{totalClients}</span>
            </div>
          </div>

          {/* Controls */}
          <div className='flex flex-col sm:flex-row gap-4'>

            {/* Search Input */}
            <div className='flex items-center gap-2'>
              <label className='text-sm font-medium text-gray-700 whitespace-nowrap'>Buscar cliente:</label>
              <div className='relative'>
                <Search size={16} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <input
                  type='text'
                  value={search}
                  placeholder='N° Documento'
                  onChange={(ev) => handleSearch?.(ev.target.value)}
                  className='w-[220px] pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300'
                />
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <label className='text-sm font-medium text-gray-700 whitespace-nowrap'>Buscar categoria:</label>
              <div className='relative'>
                <Search size={16} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <input
                  type='text'
                  value={searchActu}
                  placeholder='Categoria'
                  onChange={(ev) => handleSearchActu?.(ev.target.value)}
                  className='w-[220px] pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300'
                />
              </div>
            </div>

            {/* Page Size Selector */}
            <div className='flex items-center gap-2'>
              <label className='text-sm font-medium text-gray-700 whitespace-nowrap'>Mostrar:</label>
              <SelectCantidadClientes funtionHandle={handlePageSizeChange} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}