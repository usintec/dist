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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const model_1 = require("../database/model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const env_1 = require("../configuration/env");
// get appropriate configuration e.g DEV, STAGING OR PROD
const configuration = new env_1.EnviromentSetup(process.env.ENVIROMENT).enviroment;
/**
 * Create UserController
 */
class UserController {
    /**
     * register a new user
     * @param req request
     * @param res response
     */
    signUpUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield model_1.DB.userModel.create({
                    email: req.body.email.toString(),
                    password: bcryptjs_1.default.hashSync(req.body.password)
                });
                const token = jwt.sign({ id: user.id }, configuration.secret, {
                    expiresIn: 86400
                });
                let role = yield model_1.DB.roleModel.findAll({ where: { name: 'user' } });
                yield user.setRoles(role);
                res.status(200).send({
                    userId: user.id,
                    userEmail: user.email,
                    token: token,
                    role: role,
                    sucess: true
                });
            }
            catch (err) {
                res.status(403).send({
                    message: err.message,
                    success: false
                });
            }
        });
    }
    /**
     * Sing in an existing user
     * @param req request
     * @param res response
     * @returns null
     */
    singIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield model_1.DB.userModel.findOne({
                    where: { email: req.body.email }
                });
                if (!user)
                    return res.status(403).send({
                        message: 'User not found',
                        sucess: false
                    });
                let passwordValidity = bcryptjs_1.default.compareSync(req.body.password, user.password);
                if (!passwordValidity)
                    return res.status(403).send({ message: 'Invalid password', success: false });
                let token = jwt.sign({ id: user.id }, configuration.secret, { expiresIn: 86400 });
                res.status(200).send({
                    userId: user.id,
                    userEmail: user.email,
                    token: token,
                    status: true,
                });
            }
            catch (err) {
                res.status(403).send({
                    message: err.message,
                    success: false
                });
            }
        });
    }
}
let userController = new UserController();
exports.userController = userController;
