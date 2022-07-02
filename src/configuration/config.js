"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
/**
 * Define confugration clas
 */
class Config {
    /**
     *
     * @param hostAddr server host address
     * @param portNo server port number
     * @param db database name
     * @param dbHostAddr database host address
     * @param dbUser database user
     * @param dbPassword database password
     * @param dbPortNo database port number
     * @param secret authentication secret
     * @param totalPageBuffer max page(buffer) to hold movies from thirdParty movies db
     * @param moviesDbURL third party integration (movies database url)
     * @param moviesPerPage number of movies on a single page
     */
    constructor(hostAddr, portNo, dbName, dbHostAddr, dbUser, dbPassword, dbPortNo, secret, totalPageBuffer, moviesDbURL, moviesPerPage) {
        this._hostAddr = hostAddr;
        this._portNo = portNo;
        this._dbName = dbName;
        this._dbHostAddr = dbHostAddr;
        this._dbUser = dbUser;
        this._dbPassword = dbPassword;
        this._dbPortNo = dbPortNo;
        this._secret = secret;
        this._totalPageBuffer = totalPageBuffer;
        this._moviesDbURL = moviesDbURL;
        this._moviesPerPage = moviesPerPage;
    }
    // return host address
    get hostAddr() {
        return this._hostAddr;
    }
    // return port number
    get portNo() {
        return this._portNo;
    }
    // return database name 
    get dbName() {
        return this._dbName;
    }
    // return database host address
    get dbHostAddr() {
        return this._dbHostAddr;
    }
    // return database user
    get dbUser() {
        return this._dbUser;
    }
    // return database password
    get dbPassword() {
        return this._dbPassword;
    }
    // return database port number
    get dbPortNo() {
        return this._dbPortNo;
    }
    // return authentication secret
    get secret() {
        return this._secret;
    }
    // return total page buffer 
    get totalPageBuffer() {
        return this._totalPageBuffer;
    }
    // return movies database url
    get moviesDatabaseURL() {
        return this._moviesDbURL;
    }
    //return movies per page
    get moviesPerPage() {
        return this._moviesPerPage;
    }
}
exports.Config = Config;
