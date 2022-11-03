const Sales = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, foreignKey: true, field: 'user_id' },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true, field: 'seller_id' },
    totalPrice: { type: DataTypes.DECIMAL(9,2), field: 'total_price' },
    deliveryAddress: { type: DataTypes.STRING, field: 'delivery_address' },
    deliveryNumber: { type: DataTypes.STRING, field: 'delivery_number' },
    saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'sale_date' },
    status: { type: DataTypes.STRING, defaultValue: 'Pendente' },
  },
  {
    timestamps: false,
    tableName: 'sales'
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.users,
      { foreignKey: 'userId', as: 'user' },
      { foreignKey: 'sellerId', as: 'seller' })
  }

  return Sales;
}

module.exports = Sales;