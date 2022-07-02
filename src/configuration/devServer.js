"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentServer = void 0;
const baseConfig_1 = require("./baseConfig");
const config_1 = require("./config");
/**
 * Create Development Server
 */
class DevelopmentServer extends baseConfig_1.BaseConfig {
    constructor() {
        super(new config_1.Config(process.env.DEV_HOST, Number.parseInt(process.env.DEV_PORT), process.env.DEV_DB, process.env.DEV_DB_HOST, process.env.DEV_DB_USER, process.env.DEV_DB_PASSWORD, Number.parseInt(process.env.DEV_DB_PORT), process.env.DEV_SECRET, Number.parseInt(process.env.DEV_TOTAL_PAGE_BUFFER), process.env.DEV_MOVIES_DB_URL, Number.parseInt(process.env.DEV_MOVIES_PER_PAGE)));
    }
}
exports.DevelopmentServer = DevelopmentServer;
