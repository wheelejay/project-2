import { DataTypes, Model } from 'sequelize';
import util from 'util';
import db from '../config/db.js';
import { User } from './userModel.js';
export class UserWeight extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
UserWeight.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    recordDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    modelName: 'userWeight',
    sequelize: db,
  },
);
db.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });