"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StagingServer = void 0;
const baseConfig_1 = require("./baseConfig");
const config_1 = require("./config");
/**
 * Create Staging Server
 */
class StagingServer extends baseConfig_1.BaseConfig {
    constructor() {
        super(new config_1.Config(process.env.STAGING_HOST, Number.parseInt(process.env.STAGING_PORT), process.env.STAGING_DB, process.env.STAGING_DB_HOST, process.env.STAGING_DB_USER, process.env.STAGING_DB_PASSWORD, Number.parseInt(process.env.STAGING_DB_PORT), process.env.STAGING_SECRET, Number.parseInt(process.env.STAGING_TOTAL_PAGE_BUFFER), process.env.STAGING_MOVIES_DB_URL, Number.parseInt(process.env.STAGING_MOVIES_PER_PAGE)));
    }
}
exports.StagingServer = StagingServer;
