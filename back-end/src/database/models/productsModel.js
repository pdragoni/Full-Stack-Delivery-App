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

  return Products;
}

module.exports = Products;
