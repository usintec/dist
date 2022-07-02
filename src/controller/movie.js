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
exports.moviesController = void 0;
const env_1 = require("../configuration/env");
const movieService_1 = require("../service/movieService");
const model_1 = require("../database/model");
const Op = model_1.DB.Sequelize.Op;
const configuration = new env_1.EnviromentSetup(process.env.ENVIROMENT).enviroment;
const Movies = model_1.DB.movieModel;
class MoviesController {
    fetchMoviesFromThirdParty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield movieService_1.movieService.fetchMovies(req.params.page);
                res.status(200).send({
                    data: data,
                    success: true,
                    message: 'fetched movies'
                });
            }
            catch (err) {
                res.status(403).send({
                    success: false,
                    message: err.message
                });
            }
        });
    }
    removeMovieFromFavourite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let movie = Movies.destroy({
                    where: { id: req.params.movieId }
                });
                res.status(200).send({
                    sucess: true,
                    message: 'Movie removed from database',
                    movies: movie
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
    readFavouriteMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let moviesPerPage = req.params.limit ? parseInt(req.params.limit) : configuration.moviesPerPage;
                let offset = moviesPerPage * req.params.page;
                let rank = req.params.rank ? req.params.rank : 'createdAt';
                let order = req.params.order ? req.params.order.toString().toUpperCase() : 'ASC'; //'DESC'
                let movies = yield Movies.findAndCountAll({
                    where: { userId: req.userId },
                    limit: req.params.limit ? parseInt(req.params.limit) : 10,
                    offset: offset,
                    order: [
                        [rank, order]
                    ]
                });
                let totalPages = movies['count'] / moviesPerPage;
                let prevPage = parseInt(req.params.page) > 1 ?
                    parseInt(req.params.page) - 1 : 0;
                let nextPage = parseInt(req.params.page) < (totalPages - 1) ?
                    parseInt(req.params.page) + 1 : 0;
                res.status(200).send({
                    sucess: true,
                    message: 'fetch all favourite movies for user',
                    movies: movies,
                    nextPage: nextPage,
                    prevPage: prevPage,
                    totalPages: totalPages
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
    createMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let image;
                if (req.files != undefined)
                    image = configuration.hostAddr +
                        '/images/' + req.files[0].filename;
                let movie = yield Movies.create({
                    userId: req.userId,
                    movieStamp: req.body.movieStamp,
                    synopsis: req.body.synopsis,
                    title: req.body.title,
                    yearOfRelease: req.body.yearOfRelease,
                    language: req.body.language,
                    movieType: req.body.movieType,
                    featureImage: image ? image : req.body.featureImage
                });
                res.status(200).send({
                    sucess: true,
                    message: 'Movie created sucessfully',
                    movies: movie
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
    updateMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let image;
                if (req.files != undefined)
                    image = configuration.hostAddr +
                        '/images/' + req.files[0].filename;
                let movie = yield Movies.update({
                    synopsis: req.body.synopsis,
                    title: req.body.title,
                    yearOfRelease: req.body.yearOfRelease,
                    language: req.body.language,
                    movieType: req.body.movieType,
                    featureImage: image ? image : req.body.featureImage
                }, {
                    where: {
                        id: req.body.movieId,
                        userId: req.userId
                    }
                });
                movie[0] == 1 ?
                    res.status(200).send({
                        sucess: true,
                        message: 'Movie updated sucessfully',
                        movies: movie
                    }) :
                    res.status(403).send({
                        sucess: false,
                        message: 'Movie not updated'
                    });
                ;
            }
            catch (err) {
                res.status(403).send({
                    sucess: false,
                    message: err.message
                });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let movies = yield Movies.findAndCountAll({
                    where: {
                        [Op.or]: [
                            { title: { [Op.eq]: req.params.keyword } },
                            { language: { [Op.eq]: req.params.keyword } },
                        ]
                    }
                });
                res.status(200).send({
                    sucess: true,
                    message: 'movies fetched',
                    movies: movies
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
}
let moviesController = new MoviesController();
exports.moviesController = moviesController;
