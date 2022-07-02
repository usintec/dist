module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('role', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });
    return Role;
};
