"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConfig = void 0;
/**
 * Create Abstract Class BaseConfig
 */
class BaseConfig {
    /**
     * @param config take configuration as a parameter
     */
    constructor(config) {
        this._config = config;
    }
    // return configurations
    get Config() {
        return this._config;
    }
}
exports.BaseConfig = BaseConfig;
