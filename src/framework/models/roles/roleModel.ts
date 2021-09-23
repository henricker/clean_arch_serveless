import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@framework/utility/database'

export class RoleModel extends Model {}

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
