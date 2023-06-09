const Users = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: 'customer' },
  },
  {
    timestamps: false,
    tableName: 'users'
  });

  Users.associate = (models) => {
    Users.hasMany(models.sales, { foreignKey: 'userId', as: 'user' });
    Users.hasMany(models.sales, { foreignKey: 'sellerId', as: 'seller' });
  }

  return Users;
}

module.exports = Users;