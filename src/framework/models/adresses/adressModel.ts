import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@framework/utility/database'
import { IAdressEntity } from '@domain/entities/adressEntity'

export class AdressModel extends Model {}

// eslint-disable-next-line
export interface AdressModel extends IAdressEntity {}

AdressModel.init(
  {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'adresses',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)
