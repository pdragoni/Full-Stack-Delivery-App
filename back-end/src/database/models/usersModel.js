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
      { foreignKey: 'user_id', as: 'users' },
      { foreignKey: 'seller_id', as: 'users' })
  }

  return Users;
}

module.exports = Users;