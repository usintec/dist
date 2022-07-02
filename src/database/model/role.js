"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
/**
 * Create Role Model
 */
class RoleModel {
    /**
     *
     * @param sequelize pass new sequalize object
     * @param Sequelize pass sequalize class
     * @returns
     */
    constructor(sequelize, Sequelize) {
        this._role = sequelize.define('role', {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        });
        return this._role;
    }
}
exports.RoleModel = RoleModel;
