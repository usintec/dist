"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const env_1 = require("../../configuration/env");
const user_1 = require("./user");
const role_1 = require("./role");
const movie_1 = require("./movie");
const sequelize_1 = require("sequelize");
// get appropriate configuratios e.g Dev, Staging or Prod
const configuration = new env_1.EnviromentSetup(process.env.ENVIROMENT).enviroment;
// create sequelize object
const sequelize = new sequelize_1.Sequelize(configuration.dbName, configuration.dbUser, configuration.dbPassword, {
    host: configuration.dbHostAddr,
    dialect: 'mysql',
    pool: {
        max: 10000,
        min: 0,
        idle: 2000,
    }
});
/**
 * Create Index: Facade Pattern where DB
 * becomes a bridge to other models and
 * sequelize object.
 */
class Index {
    constructor() {
        this._DB = {
            sequelize: '',
            Sequelize: '',
            userModel: '',
            roleModel: '',
            movieModel: '',
            Roles: []
        };
        this._DB.sequelize = sequelize;
        this._DB.Sequelize = sequelize_1.Sequelize;
        this._DB.userModel = new user_1.UserModel(sequelize, sequelize_1.Sequelize);
        this._DB.roleModel = new role_1.RoleModel(sequelize, sequelize_1.Sequelize);
        this._DB.movieModel = new movie_1.MovieMode(sequelize, sequelize_1.Sequelize);
        this._DB.Roles = ['admin', 'user'];
        this._DB.userModel.belongsToMany(this._DB.roleModel, {
            through: 'user_roles',
            foreignKey: 'roleId',
            otherKey: 'userId'
        });
        this._DB.roleModel.belongsToMany(this._DB.userModel, {
            through: 'user_roles',
            foreignKey: 'userId',
            otherKey: 'roleId'
        });
        this._DB.userModel.hasMany(this._DB.movieModel);
    }
    get DB() {
        return this._DB;
    }
}
let DB = new Index().DB;
exports.DB = DB;
