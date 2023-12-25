// import { DataTypes, Model } from 'sequelize';
// import util from 'util';
// import connectToDB from './db.js';

// export const db = await connectToDB('postgresql:///code-notes');

import { DataTypes, Model } from 'sequelize';
import util from 'util';
import db from '../config/db.js';


export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}


  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sWeight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gWeight: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      modelName: 'user',
      sequelize: db,
    },
  );


