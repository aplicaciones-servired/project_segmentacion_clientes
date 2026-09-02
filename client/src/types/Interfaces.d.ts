export interface Cliente {
  FECHACARGA: Date;
  TIPODOCUMENTO: string;
  DOCUMENTO: string;
  NOMBRES: string;
  FECHANACIMIENTO: Date;
  CATEGORIA: string | null;
  DIRECCION: string;
  TIPOZONA: string | null;
  TELEFONO1: string;
  TELEFONO2: string | null;
  EMAIL: string;
  PEP: string;
  VERSION: string;
}

export interface DataResponse {
  count: number;
  clients: Cliente[];
  page: number;
  pageSize: number;
}

export interface User {
  id: string;
  names: string;
  lastnames: string;
  username: string;
  email: string;
  company: string;
  process: string;
  sub_process: string;
}

export interface ReportDataBaloto {
  CAJERO: string;
  FECHAPAGO: string;
  PREMIO: number;
  RETEFUENTE: number;
  SERIE_CONSECUTIVO: string;
  TERCERO: string;
  TIPOPREMIO: string;
  ZONA: string;
}

export interface DataCliente {
  TOTALPREMIOS: string;
  CANT: number;
  Client: Client;
}

export interface Client {
  DOCUMENTO: string;
  NOMBRES: string;
  DIRECCION: string;
  TELEFONO1: string;
}

export interface ReportPremios {
  TERCERO: string;
  FECHAPAGO: Date;
  CANT_PREMIOS_CHANCE: number;
  CANT_PREMIOS_ASTRO: number;
  CANT_PREMIOS_LOTERIA: number;
  CANT_PREMIOS_RASPE: number;
  TOTAL_PREMIOS_COBRADOS: number;
  Client: ReportClient;
}

export interface ReportClient {
  TIPODOCUMENTO: string;
  NOMBRES: string;
  CATEGORIA: string;
  DIRECCION: string;
  TELEFONO1: string;
}

export interface ReportMayores {
  FECHAPAGO: string;
  SERIE_KARDEX: string;
  SERIE_CONSECUTIVO: string;
  TERCERO: string;
  COD_DANE: string;
  TOTAL_PREMIOS: string;
  Client: ClientMayores;
}

export interface ClientMayores {
  TIPODOCUMENTO: Tipodocumento;
  NOMBRES: string;
}

export enum Tipodocumento {
  Cc = "CC",
  Cemp = "CEMP",
}

export interface ReportLaft {
  TERCERO: string;
  CANT_PREMIOS_CHANCE: number;
  CANT_PREMIOS_ASTRO: number;
  CANT_PREMIOS_LOTERIA: number;
  CANT_PREMIOS_RASPE: number;
  CANT_PREMIOS_BALOTO: number;
  CANT_PREMIOS_MILOTO: number;
  CANT_PREMIOS_CLOTO: number;
  TOTAL_PREMIOS_COBRADOS: string;
  Client: Laft;
}

export interface Laft {
  TIPODOCUMENTO: string;
  NOMBRES: string;
  DIRECCION: string;
  TELEFONO1: string;
  PEP: string;
}

export interface ReportOracleInterface {
  fechapago: string;
  serie: string;
  premio: number;
  vendedor: string;
  hora: string;
  punto_vta_pago: number;
  cliente: number;
  nombres: string;
  nombrecliente: string;
  municipio: number;
}

export interface CompanyData {
  empresa: string;
  data: ChartData[];
}

export interface ChartData {
  [key: string]: string | number;
  id: number;
  label: string;
  value: number;
}

export interface PremioI {
  TIPOPREMIO: string;
  CANT: number;
}

export interface CompanyData2 {
  Multired: PremioI[];
  Servired: PremioI[];
}
