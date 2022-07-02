module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        email: {
            type: Sequelize.STRING,
            isEmail: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            min: 6,
            allowNull: false,
        }
    });
    return User;
};
