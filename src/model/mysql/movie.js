module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define('user', {
        synopsis: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        yearOfRelease: {
            type: Sequelize.STRING,
            allowNull: true,
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
    return Movie;
};
