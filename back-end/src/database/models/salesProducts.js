const SalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    sale_id: { type: DataTypes.INTEGER, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, primaryKey: true },
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'salesProducts'
  });

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'Products',
      through: SalesProducts,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.products.belongsToMany(models.sales, {
      as: 'Sales',
      through: SalesProducts,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  };

  return SalesProducts;
}

module.exports = SalesProducts;