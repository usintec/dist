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
exports.movieService = void 0;
const env_1 = require("../configuration/env");
const httpClient_1 = require("./httpClient");
const movieModel_1 = require("./model/movieModel");
const movieType_1 = require("./model/movieType");
// get appropriate configuration e.g DEV, STAGING OR PROD
const configuration = new env_1.EnviromentSetup(process.env.ENVIROMENT).enviroment;
/**
 * Create MovieService
 */
class MovieService extends httpClient_1.HttpClient {
    /**
     * Construct MovieService with empty buffer and
     * supply base url to the parent constructor
     * @param moviesCollection
     */
    constructor() {
        super(configuration.moviesDatabaseURL);
        //used this to hold the page number of the pages in buffer.
        //this help to avoid linear search.Searching works in O(1)
        this._activeMoviesInBuffer = {};
        this._moviesCollection = [];
    }
    // return items in the buffer
    get moviesCollection() {
        return this._moviesCollection;
    }
    /**
     * Store a collection/page along with the page number in the buffer only if the buffer is not full
     * Buffer size = configuration.totalPageBuffer
     * @param movieCollection
     * @returns true true if collection/page is stored in the buffer otherwise return false
     */
    add(movieCollection) {
        if (this._moviesCollection.length >= configuration.totalPageBuffer)
            return false;
        this._moviesCollection.push(movieCollection);
        //if the collection/page of movies in stored in the buffer sucessfuly, then store the 
        //page number as the key in the key value pair storage to be used for searching later
        this._activeMoviesInBuffer[movieCollection.pageNo.toString()] = 'active';
        return true;
    }
    /**
     * remove a collection/page of movies from the buffer provided the buffer has more than
     * one collection/page. if removed sucessfully, then remove/delete the collection/page's
     * number from the key-value pair storage.
     */
    remove() {
        let pageNo;
        if (this._moviesCollection.length > 1)
            pageNo = this._moviesCollection.shift().pageNo;
        if (pageNo)
            delete this._activeMoviesInBuffer[pageNo.toString()];
    }
    /**
     * Third party integration
     * fetch movies from the third party movies database.
     * This function first check the buffer to find the requested collection/page of movies.
     * if found, it returns the collection/page otherwise it fecthes the movies from the third party db
     * @param pageNo page number to feched e.g 1 for the first page
     * @returns MovieInterface: a collection/page of movies
     */
    fetchMovies(pageNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this._activeMoviesInBuffer.hasOwnProperty(pageNo)) //Do we have the collecton in the buffer
                    return this.moviesCollection.find(value => value.pageNo == pageNo); //serch on O(n) and return the collection
                let movies = yield this.instance.get(`/api/videos?paginate=1&per_page=${configuration.moviesPerPage}&page=${pageNo}`);
                movies = movies['data']['videos'];
                let tempMovies = {
                    pageNo: Number.parseInt(movies['current_page']),
                    moviesList: movies['data'].map(value => new movieModel_1.MoviesModel(value['synopsis'], value['id'], value['title'], value['year_of_release'], value['language'], value['type'] == 0 ? movieType_1.MovieType.MOVIE :
                        value['type'] == 1 ? movieType_1.MovieType.SERIES : movieType_1.MovieType.MUSIC, value['featured_image']))
                };
                if (!this.add(tempMovies)) { //if the buffer is full, remove the oldes collection/page from the queue
                    this.remove();
                    this.add(tempMovies); //then push the new collection to the buffer
                }
                ;
                return tempMovies;
            }
            catch (err) {
                throw err;
            }
            ;
        });
    }
}
let movieService = new MovieService();
exports.movieService = movieService;
