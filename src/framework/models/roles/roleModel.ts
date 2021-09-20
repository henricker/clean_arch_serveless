import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@framework/utility/database'
import { IRoleEntity } from '@domain/entities/roleEntity'

export class RoleModel extends Model {}

export interface RoleModel extends IRoleEntity {}

RoleModel.init(
  {
    profile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'roles',
    timestamps: true,
    underscored: true,
    sequelize,
  }
)
