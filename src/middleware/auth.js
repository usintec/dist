"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const env_1 = require("../configuration/env");
const model_1 = require("../database/model");
// get appropriate configurations e.g DEV, STAGING OR PROD
const configuration = new env_1.EnviromentSetup(process.env.ENVIROMENT).enviroment;
/**
 * Create Authentication Middleware
 */
class AuthenticationMiddleware {
    /**
     * verify if the user provider a token and
     * if the provided token is valid
     * @param req request
     * @param res response
     * @param next next line of action
     * @returns
     */
    verifyToken(req, res, next) {
        let token = req.headers['authorization'];
        if (!token)
            return res.status('403').send({
                message: 'No token is provided',
                sucess: false
            });
        jwt.verify(token, configuration.secret, (err, decoded) => {
            if (err)
                return res.status('403').send({
                    message: 'Unauthorised',
                    sucess: false
                });
            req.userId = decoded.id;
            next();
        });
    }
    /**
     * verify if the user is an admin in our db
     * @param req request
     * @param res response
     * @param next next line of action
     */
    verifyAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield model_1.DB.userModel.findByPK(req.userId);
                if (user.getRoles().include('admin'))
                    next();
                res.status(403).send({
                    message: 'Required Admin role',
                    sucess: false
                });
            }
            catch (err) {
                res.status('403').send({
                    message: 'Admin not found',
                    status: false
                });
            }
        });
    }
    /**
     * verify if the user is truely one of our user in db
     * @param req
     * @param res
     * @param next
     */
    verifyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield model_1.DB.userModel.findByPk(req.userId);
                let roles = yield user.getRoles();
                let role = roles.find(value => value.name == 'user');
                if (role)
                    return next();
                res.status(403).send({
                    message: 'Required User role',
                    sucess: false
                });
            }
            catch (err) {
                res.status('403').send({
                    message: err.message,
                    status: false
                });
            }
        });
    }
}
let authenticationMiddleware = new AuthenticationMiddleware();
exports.authenticationMiddleware = authenticationMiddleware;
