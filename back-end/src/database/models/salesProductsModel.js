const SalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    saleId: { type: DataTypes.INTEGER, primaryKey: true, field: 'sale_id' },
    productId: { type: DataTypes.INTEGER, primaryKey: true, field: 'product_id' },
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'sales_products'
  });

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return SalesProducts;
}

module.exports = SalesProducts;