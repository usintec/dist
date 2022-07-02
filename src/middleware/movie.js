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
exports.movieValidationMiddleware = void 0;
const model_1 = require("../database/model");
class MovieValidationMiddleware {
    moviesValidation(req, res, next) {
        let error = [];
        if (!req.body.title)
            error.push('title can not be empty');
        if (!req.body.yearOfRelease)
            error.push('year of release can not be empty');
        if (!req.body.movieType)
            error.push('movie type can not be empty');
        if (typeof req.body.title !== 'string' ||
            req.body.title.trim() === '' ||
            !Number.isNaN(Number(req.body.title)))
            error.push('title can not be a number');
        if (!(typeof req.body.yearOfRelease !== 'string' ||
            req.body.yearOfRelease.trim() === '' ||
            !Number.isNaN(Number(req.body.yearOfRelease))))
            error.push('year of release should be a number');
        if (!(typeof req.body.movieType !== 'string' ||
            req.body.movieType.trim() === '' ||
            !Number.isNaN(Number(req.body.movieType))))
            error.push('movie type should be a number');
        if (req.body.movieType.length > 1)
            error.push('movie type should be one digit');
        if (parseInt(req.body.movieType) > 2)
            error.push("movie type can only be '0' for movies or '1' for series or '2' for music");
        if (error.length == 0)
            return next();
        res.status(403).send({
            sucess: false,
            message: 'validation error',
            error: error
        });
    }
    keywordValidation(req, res, next) {
        let error = [];
        if (!req.params.keyword)
            error.push('keyword can not be empty. pass a parameter (keyword) to search');
        if (typeof req.params.keyword !== 'string' ||
            req.params.keyword.trim() === '' ||
            !Number.isNaN(Number(req.params.keyword)))
            error.push('keyword should be string');
        if (error.length == 0)
            return next();
        res.status(403).send({
            sucess: false,
            message: 'validation error',
            error: error
        });
    }
    movieIdValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = [];
            if (!req.params.movieId)
                error.push('movie id can not be empty');
            if (!(typeof req.params.movieId !== 'string' ||
                req.params.movieId.trim() === '' ||
                !Number.isNaN(Number(req.params.movieId))))
                error.push('movie id should be a number');
            let movie = yield model_1.DB.movieModel.findByPk(req.params.movieId);
            if (!movie)
                error.push('no movie with the specified id');
            if (error.length == 0)
                return next();
            res.status(403).send({
                sucess: false,
                message: 'validation error',
                error: error
            });
        });
    }
    favouriteMovieValidation(req, res, next) {
        let error = [];
        let result;
        let rank = ['title', 'yearOfRelease', 'language', 'movieType', 'id', 'createdAt'];
        if (!req.params.page)
            error.push('page number can not be empty. pass page number to fetch');
        if (!(typeof req.params.page !== 'string' ||
            req.params.page.trim() === '' ||
            !Number.isNaN(Number(req.params.page))))
            error.push('page param should be a number');
        if (req.params.limit)
            if (!(typeof req.params.limit !== 'string' ||
                req.params.limit.trim() === '' ||
                !Number.isNaN(Number(req.params.limit))))
                error.push('limit param should be a number');
        if (req.params.rank)
            result = rank.find(val => val == req.params.rank);
        if (!result)
            error.push(`rank mush be one of ${rank}`);
        if (req.params.order)
            if (req.params.order.toUpperCase() != 'ASC' && req.params.order.toUpperCase() != 'DESC')
                error.push("order must be either 'ASC' or 'DESC'");
        if (error.length == 0)
            return next();
        res.status(403).send({
            sucess: false,
            message: 'validation error',
            error: error
        });
    }
}
const movieValidationMiddleware = new MovieValidationMiddleware();
exports.movieValidationMiddleware = movieValidationMiddleware;
