import { ConsultaResultAttrib } from '@type/interface';
import { Premios } from '@models/premios.model';
import { Parametros } from '@models/parametros.model';
import { fn, literal } from 'sequelize';

const cantMin = 15
const cantMax = 48

export async function obtenerUVT(): Promise<number> {
  const parametro = await Parametros.findOne({
    where: { NOMBRE: 'VALUVT' },
    attributes: ['VALOR']
  });
  const valorUVT = parametro ? parseInt(parametro.VALOR) : 47065;
  console.log('UVT desde base de datos:', valorUVT);
  return valorUVT;
}

/**
 * 
 * @param fecha string | Undefined
 * @param zone 39627 = Multired | 39628 = Servired
 * @returns Menor: string, Rango: string, Mayor: string 
 */

export const CantidadPremios = async (fecha: string | undefined, zone: 39627 | 39628) => {
  const uvt = await obtenerUVT();
  const menor15 = cantMin * uvt;
  const mayor48 = cantMax * uvt;

  console.log('first', uvt)

  const opc = fecha !== undefined && fecha !== 'undefined' ? fecha.slice(0, 10) : fn('CURDATE');

  const Data: ConsultaResultAttrib[] = await Premios.findAll({
    attributes: [
      [fn('SUM', literal(`PREMIO < ${menor15}`)), 'Menor'],
      [fn('SUM', literal(`PREMIO BETWEEN ${menor15} AND ${mayor48}`)), 'Rango'],
      [fn('SUM', literal(`PREMIO > ${mayor48}`)), 'Mayor']
    ],
    where: {
      FECHAPAGO: opc,
      ZONA: zone
    },
    raw: true
  }) as unknown as ConsultaResultAttrib[];

  return Data[0]
}