const Users = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'users'
  });

  Users.associate = (models) => {
    Users.hasMany(models.sales,
      { foreignKey: 'userId', as: 'users' },
      { foreignKey: 'sellerId', as: 'users' })
  }

  return Users;
}

module.exports = Users;