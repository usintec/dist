"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesModel = void 0;
/**
 * Create MoviesModel
 */
class MoviesModel {
    /**
     * Construct Movie's object from its class
     * @param synopsis movie's description
     * @param movieStamp movie's unique identifier from third party movies db
     * @param title movie's title
     * @param yearOfRelease movie's year of release
     * @param language movie's language
     * @param movieType movie's type e.g Movies, Series or Musical movies
     * @param featureImage movie's poster
     */
    constructor(synopsis, movieStamp, title, yearOfRelease, language, movieType, featureImage) {
        this._synopsis = synopsis;
        this._movieStamp = movieStamp;
        this._title = title,
            this._yearOfRelease = yearOfRelease,
            this._language = language,
            this._movieType = movieType,
            this._featureImage = featureImage;
    }
    // return class member synopsis;
    get synopsis() {
        return this._synopsis;
    }
    // return class member movieStamp
    get movieStamp() {
        return this._movieStamp;
    }
    // return class member title
    get title() {
        return this._title;
    }
    // return class member yearOfRelease
    get yearOfRelease() {
        return this._yearOfRelease;
    }
    // return class member language
    get language() {
        return this._language;
    }
    //return class member movieType
    get movieType() {
        return this._movieType;
    }
    //return class member featureImage
    get featureImage() {
        return this._featureImage;
    }
}
exports.MoviesModel = MoviesModel;
