import { getAllClients, getClientById, getClientByFN, updateCliente, getAllClientsNuevos, updateClientes, getAllClientsMasivos, updateClienteMasivos } from '@controllers/clientes.controllers';

// TODO: este es una funcion que solo se usa para pruebas
import { insertTest } from '@controllers/insertTest';

import { Router } from 'express';

const clientRoutes = Router();

clientRoutes.get('/clientes', getAllClients);

clientRoutes.get('/clientesMasivos', getAllClientsMasivos);

clientRoutes.get('/clientesNuevos', getAllClientsNuevos);

clientRoutes.get('/getCliente/:id', getClientById)

clientRoutes.post('/clienteFN', getClientByFN)

clientRoutes.post('/updateCliente', updateCliente)

clientRoutes.post('/updateClienteMasivos', updateClienteMasivos)

clientRoutes.get('/crearDatosMasivos', insertTest)

clientRoutes.post('/updateClientes', updateClientes)

export { clientRoutes };