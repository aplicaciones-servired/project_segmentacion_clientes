import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';
import Root from './Root';

import Loading from '@/components/ui/LoadingComp';

const ClienteNuevosPage = lazy(() => import('@/pages/ClientesNuevos'));
const SeleccionReportes = lazy(() => import('@/pages/SeleccionReportes'));
const ClienteTodosPage = lazy(() => import('@/pages/ClientesTodos'));
const ClienteTodosPageActu = lazy(() => import('@/pages/ClientesTodosActualizacion'));
const EditarClientePage = lazy(() => import('@/pages/EditarCliente'));
const ReporteBaloto = lazy(() => import('@/pages/reports/baloto'));
const ReportClienteGanadores = lazy(() => import('@/pages/reports/clientes-mas-ganadores'));
const ReportCobrados = lazy(() => import('@/pages/reports/cobrados-colocador'));
const ReportMayores = lazy(() => import('@/pages/reports/mayores-15uvt'));
const ReportLaft = lazy(() => import('@/pages/reports/report-laft'));
const ReportOracle = lazy(() => import('@/pages/reports/premios-pagados'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const TusDatos = lazy(() => import('@/pages/TusDatos'));

export const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loading />}><ClienteTodosPage /></Suspense>
      },
      {
        path: 'actualizacion-masiva',
        element: <Suspense fallback={<Loading />}><ClienteTodosPageActu /></Suspense>
      },
      {
        path: 'reportes',
        element: <Suspense fallback={<Loading />}><SeleccionReportes /></Suspense>
      },

      {
        path: 'clientes-nuevos',
        element: <Suspense fallback={<Loading />}><ClienteNuevosPage /></Suspense>
      },
      {
        path: 'editar-cliente/:id',
        element: <Suspense fallback={<Loading />}><EditarClientePage /></Suspense>
      },
      {
        path: 'reportBaloto',
        element: <Suspense fallback={<Loading />}><ReporteBaloto /></Suspense>
      },
      {
        path: 'reportClientGanadores',
        element: <Suspense fallback={<Loading />}><ReportClienteGanadores /></Suspense>
      },
      {
        path: 'reportCobrados',
        element: <Suspense fallback={<Loading />}><ReportCobrados /></Suspense>
      },
      {
        path: 'reportPremiosMayores',
        element: <Suspense fallback={<Loading />}><ReportMayores /></Suspense>
      },
      {
        path: 'reporteLAFT',
        element: <Suspense fallback={<Loading />}><ReportLaft /></Suspense>
      },
      {
        path: 'reportOracle',
        element: <Suspense fallback={<Loading />}><ReportOracle /></Suspense>
      },
      {
        path: 'dashboard',
        element: <Suspense fallback={<Loading />}><Dashboard /></Suspense>
      },
      {
        path: 'tus-datos',
        element: <Suspense fallback={<Loading />}><TusDatos /></Suspense>
      }
    ]
  }
]);