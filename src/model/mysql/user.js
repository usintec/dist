"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
/**
 * Create UserModel
 */
class UserModel {
    /**
     *
     * @param sequelize pass new sequalize object
     * @param Sequelize pass sequalize class
     * @returns
     */
    constructor(sequelize, Sequelize) {
        this._user = sequelize.define('user', {
            email: {
                type: Sequelize.STRING,
                isEmail: true,
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                min: 6,
                allowNull: false,
            },
        }, {
            scopes: {
                withoutPassword: {
                    attributes: { exclude: ['password'] }
                }
            }
        });
        return this._user;
    }
}
exports.UserModel = UserModel;
