"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionServer = void 0;
const baseConfig_1 = require("./baseConfig");
const config_1 = require("./config");
/**
 * Create Production Server
 */
class ProductionServer extends baseConfig_1.BaseConfig {
    constructor() {
        super(new config_1.Config(process.env.PROD_HOST, Number.parseInt(process.env.PROD_PORT), process.env.PROD_DB, process.env.PROD_DB_HOST, process.env.PROD_DB_USER, process.env.PROD_DB_PASSWORD, Number.parseInt(process.env.PROD_DB_PORT), process.env.PROD_SECRET, Number.parseInt(process.env.PROD_TOTAL_PAGE_BUFFER), process.env.PROD_MOVIES_DB_URL, Number.parseInt(process.env.PROD_MOVIES_PER_PAGE)));
    }
}
exports.ProductionServer = ProductionServer;
