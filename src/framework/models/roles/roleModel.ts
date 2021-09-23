import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@framework/utility/database'

export class RoleModel extends Model {}

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
