"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnviromentSetup = void 0;
const devServer_1 = require("./devServer");
const prodServer_1 = require("./prodServer");
const stagServer_1 = require("./stagServer");
class EnviromentSetup {
    constructor(envName) {
        this._envName = envName;
    }
    get enviroment() {
        switch (this._envName) {
            case 'DEV':
                return new devServer_1.DevelopmentServer().Config;
                break;
            case 'STAGING':
                return new stagServer_1.StagingServer().Config;
                break;
            case 'PROD':
                return new prodServer_1.ProductionServer().Config;
                break;
        }
        return null;
    }
}
exports.EnviromentSetup = EnviromentSetup;
