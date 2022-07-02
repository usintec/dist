"use strict";
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
exports.userValidationMiddleware = void 0;
const model_1 = require("../database/model");
class UserValidationMiddleware {
    isEmail(req, res, next) {
        let regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (regExp.test(req.body.email))
            return next();
        res.status(403).send({
            sucess: false,
            message: 'Not valid Email'
        });
    }
    isPassword(req, res, next) {
        let regExp = new RegExp("^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$");
        if (regExp.test(req.body.password))
            return next();
        res.status(403).send({
            sucess: false,
            message: 'Not valid password. Password should have minumum of 8 characters with at least 2 numericals'
        });
    }
    isEmailUnique(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = model_1.DB.userModel.findOne({
                    where: { email: req.body.email }
                });
                user.then(val => {
                    console.log(val);
                    if (!val)
                        return next();
                    res.status(403).send({
                        sucess: false,
                        message: 'Duplicate email'
                    });
                });
            }
            catch (err) {
                res.status(403).send({
                    sucess: false,
                    message: err.message
                });
            }
        });
    }
    confirmPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.password === req.body.confirmPassword)
                return next();
            res.status(403).send({
                sucess: false,
                message: 'password and confirmPassword fields do not merch'
            });
        });
    }
}
const userValidationMiddleware = new UserValidationMiddleware();
exports.userValidationMiddleware = userValidationMiddleware;
