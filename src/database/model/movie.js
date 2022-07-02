"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieMode = void 0;
/**
 * Create Movie Model
 */
class MovieMode {
    /**
     *
     * @param sequelize pass new sequalize object
     * @param Sequelize pass sequalize class
     * @returns
     */
    constructor(sequelize, Sequelize) {
        this._movie = sequelize.define('movie', {
            synopsis: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            movieStamp: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            yearOfRelease: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            language: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            movieType: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            featureImage: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        });
        return this._movie;
    }
}
exports.MovieMode = MovieMode;
