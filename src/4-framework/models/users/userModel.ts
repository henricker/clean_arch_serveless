import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@root/src/4-framework/utility/database'
import { IUserEntity } from '@root/src/1-domain/entities/userEntity'
import { RoleModel } from '../roles/roleModel'

export class UserModel extends Model {}

// eslint-disable-next-line
export interface UserModel extends IUserEntity {}

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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)

UserModel.hasOne(RoleModel, {
  foreignKey: 'id',
  sourceKey: 'role_id',
  as: 'role',
})
