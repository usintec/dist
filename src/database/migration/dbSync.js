"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require('dotenv').config();
// import { EnviromentSetup } from "../../configuration/env";
const sequelize_1 = require("sequelize");
// console.log(process.env.ENVIROMENT);
// get appropriate configuratios e.g Dev, Staging or Prod
// const configuration = new EnviromentSetup('DEV').enviroment;
// console.log(configuration);
const sequelize = new sequelize_1.Sequelize('moviesdb', 'root', 'biodun1987', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 10000,
        min: 0,
        idle: 2000,
    }
});
sequelize.sync();
// DB.sequelize.sync({force: true});
