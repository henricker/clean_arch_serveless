import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@framework/utility/database'
import { IRoleEntity } from '@domain/entities/roleEntity'

export class RoleModel extends Model {}

// eslint-disable-next-line
export interface RoleModel extends IRoleEntity {}

RoleModel.init(
  {
    profile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'roles',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)
