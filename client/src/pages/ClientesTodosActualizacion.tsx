import { RenderFooterClients } from '@/components/ui/footer-clientes';
import { HeaderPagesClientesActu } from '@/components/ui/header-pages-clientesActu';
import { RenderClientsActu } from '@/components/ui/render-clients-list-Actu';
import { useClientesActu } from '@/hooks/useClientesActu';
import { useState } from 'react';

function ClientesTodos() {
  const {
    clients,
    totalClients,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    searchActu,
    setSearchActu,
    setPageSize,
  } = useClientesActu({ url: 'clientesMasivos' });
  
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  return (
    <section className='h-screen flex flex-col bg-gray-50'>

      {/* Header Section */}
      <HeaderPagesClientesActu
        totalClients={totalClients}
        search={search}
        handlePageSizeChange={setPageSize}
        handleSearch={setSearch}
        searchActu={searchActu}
        handleSearchActu={setSearchActu}
      />

      {/* ...existing code... */}
      <section className='flex-1 overflow-y-auto'>
        <RenderClientsActu
          clientes={clients}
          seleccionados={seleccionados}
          setSeleccionados={setSeleccionados}
        />
      </section>

      <RenderFooterClients
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

    </section>
  )
};

export default ClientesTodos;