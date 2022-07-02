"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
model_1.DB.roleModel.create({
    id: 1,
    name: model_1.DB.Roles[0].toString()
}).then(() => {
    console.log('create role 1');
}).catch((err) => {
    console.log(err.message);
});
model_1.DB.roleModel.create({
    id: 2,
    name: model_1.DB.Roles[1].toString()
}).then(() => {
    console.log('create role 2');
}).catch((err) => {
    console.log(err.message);
});
