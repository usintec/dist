"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
class HttpClient {
    constructor(baseURL) {
        this._initializeResponseInterceptor = () => {
            this.instance.interceptors.request.use(this._handleRequest);
            this.instance.interceptors.response.use(this._handleResponse, this._handleError);
        };
        this._handleResponse = ({ data }) => data;
        this._handleRequest = (config) => {
            // config.headers['Authorization'] = 'Bearer ...';
            config.headers['Origin'] = 'https://myafrostream.tv';
            config.headers['Referer'] = 'https://myafrostream.tv';
            return config;
        };
        this._handleError = (error) => Promise.reject(error);
        this.instance = axios_1.default.create({ baseURL: baseURL });
        this._initializeResponseInterceptor();
    }
}
exports.HttpClient = HttpClient;
