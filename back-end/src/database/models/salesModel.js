const Sales = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, foreignKey: true },
    seller_id: { type: DataTypes.INTEGER, foreignKey: true },
    total_price: DataTypes.DECIMAL(9,2),
    delivery_adress: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'sales'
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.Users,
      { foreignKey: 'user_id', as: 'users' },
      { foreignKey: 'seller_id', as: 'users' })
  }

  return Sales;
}

module.exports = Sales;
