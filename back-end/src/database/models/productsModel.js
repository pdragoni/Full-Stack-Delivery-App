const Products = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    url_image: { type: DataTypes.STRING, defaultValue: '' },
  },
  {
    timestamps: false,
    tableName: 'products'
  });

  Products.associate = (models) => {
    Products.hasMany(models.salesProducts,
      { foreignKey: 'productId', as: 'products' });
  };

  return Products;
}

module.exports = Products;