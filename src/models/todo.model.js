module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define('Todos', {
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isCompleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
    });
  
    return Todo;
};
  