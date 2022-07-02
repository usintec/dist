"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const user_2 = require("../middleware/user");
const UserRouter = express_1.default.Router();
exports.UserRouter = UserRouter;
/**
 * Add routes to UserRouter
 */
UserRouter.post('/register', [
    user_2.userValidationMiddleware.isEmail,
    user_2.userValidationMiddleware.isEmailUnique,
    user_2.userValidationMiddleware.isPassword,
    user_2.userValidationMiddleware.confirmPassword
], user_1.userController.signUpUser);
UserRouter.post('/signin', [
    user_2.userValidationMiddleware.isEmail,
    user_2.userValidationMiddleware.isPassword
], user_1.userController.singIn);
