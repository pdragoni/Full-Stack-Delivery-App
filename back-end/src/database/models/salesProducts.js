const SalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    saleId: { type: DataTypes.INTEGER, primaryKey: true, field: 'sale_id' },
    productId: { type: DataTypes.INTEGER, primaryKey: true, field: 'product_id' },
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'salesProducts'
  });

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  };

  return SalesProducts;
}

module.exports = SalesProducts;