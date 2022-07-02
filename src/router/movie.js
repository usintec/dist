"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesRouter = void 0;
const express_1 = __importDefault(require("express"));
const movie_1 = require("../controller/movie");
const auth_1 = require("../middleware/auth");
const movie_2 = require("../middleware/movie");
const upload_1 = __importDefault(require("../middleware/upload"));
const MoviesRouter = express_1.default.Router();
exports.MoviesRouter = MoviesRouter;
/**
 * Add routes to MoviesRouter
 */
MoviesRouter.get('/:page', movie_1.moviesController.fetchMoviesFromThirdParty);
MoviesRouter.get('/favourite/:page/:limit?/:rank?/:order?', [
    auth_1.authenticationMiddleware.verifyToken,
    auth_1.authenticationMiddleware.verifyUser,
    movie_2.movieValidationMiddleware.favouriteMovieValidation
], movie_1.moviesController.readFavouriteMovie);
MoviesRouter.get('/search/:keyword', [
    auth_1.authenticationMiddleware.verifyToken,
    auth_1.authenticationMiddleware.verifyUser,
    movie_2.movieValidationMiddleware.keywordValidation
], movie_1.moviesController.search);
MoviesRouter.post('/', [
    auth_1.authenticationMiddleware.verifyToken,
    auth_1.authenticationMiddleware.verifyUser
], [upload_1.default.array('files')], movie_1.moviesController.createMovie);
MoviesRouter.post('/add', [
    auth_1.authenticationMiddleware.verifyToken,
    auth_1.authenticationMiddleware.verifyUser,
    movie_2.movieValidationMiddleware.movieIdValidation
], [upload_1.default.array('files')], movie_1.moviesController.addMovieToFavourite);
MoviesRouter.put('/update', [
    auth_1.authenticationMiddleware.verifyToken,
    auth_1.authenticationMiddleware.verifyUser,
    movie_2.movieValidationMiddleware.moviesValidation
], [upload_1.default.array('files')], movie_1.moviesController.updateMovie);
MoviesRouter.delete('/:movieId', [
    auth_1.authenticationMiddleware.verifyToken,
    auth_1.authenticationMiddleware.verifyUser,
    movie_2.movieValidationMiddleware.movieIdValidation
], movie_1.moviesController.removeMovieFromFavourite);
