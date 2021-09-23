import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@framework/utility/database'
import { RoleModel } from '../roles/roleModel'

export class UserModel extends Model {}

UserModel.init(
  {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    forgot_password_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    sequelize,
  }
)

UserModel.hasOne(RoleModel, {
  foreignKey: 'id',
  sourceKey: 'role_id',
  as: 'role',
})
