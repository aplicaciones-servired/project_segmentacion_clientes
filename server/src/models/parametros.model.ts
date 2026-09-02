import { Model, Optional, DataTypes } from 'sequelize';
import PowerBi from '@connections/mysqldb'

interface ParametrosAttributes {
  ID: number;
  NOMBRE: string;
  VALOR: string;
  TIPO_DATO: 'TEXTO' | 'ENTERO' | 'DECIMAL' | 'FECHA' | 'BOOLEANO';
  GRUPO_PARAMETRO: string;
  ESTADO: boolean;
  DESCRIPCION: string;
  FECHA_CREACION: Date;
  USUARIO_CREACION: string;
  FECHA_MODIFICACION: Date;
  USUARIO_MODIFICACION: string;
}

type ParametrosCreationAttributes = Optional<ParametrosAttributes, 'ID' | 'FECHA_CREACION' | 'FECHA_MODIFICACION'>;

class Parametros extends Model<ParametrosAttributes, ParametrosCreationAttributes> {
  declare ID: number;
  declare NOMBRE: string;
  declare VALOR: string;
  declare TIPO_DATO: 'TEXTO' | 'ENTERO' | 'DECIMAL' | 'FECHA' | 'BOOLEANO';
  declare GRUPO_PARAMETRO: string;
  declare ESTADO: boolean;
  declare DESCRIPCION: string;
  declare FECHA_CREACION: Date;
  declare USUARIO_CREACION: string;
  declare FECHA_MODIFICACION: Date;
  declare USUARIO_MODIFICACION: string;
}

Parametros.init({
  ID: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  NOMBRE: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  VALOR: { type: DataTypes.STRING(255), allowNull: true, defaultValue: null },
  TIPO_DATO: { type: DataTypes.ENUM('TEXTO', 'ENTERO', 'DECIMAL', 'FECHA', 'BOOLEANO'), allowNull: true, defaultValue: null },
  GRUPO_PARAMETRO: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
  ESTADO: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
  DESCRIPCION: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  FECHA_CREACION: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
  USUARIO_CREACION: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
  FECHA_MODIFICACION: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
  USUARIO_MODIFICACION: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
}, {
  sequelize: PowerBi,
  tableName: 'PARAMETROS',
  timestamps: false,
})

export { Parametros }