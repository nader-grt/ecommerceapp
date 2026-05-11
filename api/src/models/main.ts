import sequelize from "./../dbConfig/config";

import { UserModel } from "./user.js";
import { ProductModel } from "./product.js";
import { CategoriesModel } from "./category";
import { EmployeesModel } from "./Employee";
import { SupplierModel } from "./Suplliers";
import { SecretaryModel } from "./Secrtrie";
import { DelivererPersonModel } from "./DeleveryPerson";
import { OrderModel } from "./Order";
import { OrderItemModel } from "./OrderItem";
import { DayWorkModel } from "./DayWork";
import { DelivererDayWorkModel } from "./DelivererDayWork";

import {
  OrderWithDeliverie,
  OrderWithDeliverieModel,
} from "./OrderWithDeliverie";

import { RefreshTokenModel } from "./RefreshTokenModel";
import { AddressModel } from "./Address";
import { InvoiceModel } from "./Invoice";

/* =====================================
   Initialize Models
===================================== */

export const User = UserModel(sequelize);

export const Product = ProductModel(sequelize);

export const Category = CategoriesModel(sequelize);

export const Employee = EmployeesModel(sequelize);

export const DelivererPerson = DelivererPersonModel(sequelize);

export const Secretary = SecretaryModel(sequelize);

export const Supplier = SupplierModel(sequelize);

export const Order = OrderModel(sequelize);

export const OrderItem = OrderItemModel(sequelize);

export const DayWork = DayWorkModel(sequelize);

export const DelivererDayWork =
  DelivererDayWorkModel(sequelize);

export const Orderwithdeliverie =
  OrderWithDeliverieModel(sequelize);

export const RefreshToken =
  RefreshTokenModel(sequelize);

export const Address =
  AddressModel(sequelize);

export const Invoice =
  InvoiceModel(sequelize);

/* =====================================
   User - RefreshToken (1 : N)
===================================== */

User.hasMany(RefreshToken, {
  foreignKey: "userId",
  as: "tokens",
});

RefreshToken.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

/* =====================================
   User - Address (1 : N)
===================================== */

User.hasMany(Address, {
  foreignKey: "userId",
  as: "addresses",
});

Address.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

/* =====================================
   Category - Product (1 : N)
===================================== */

Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

/* =====================================
   User - Order (1 : N)
===================================== */

User.hasMany(Order, {
  foreignKey: "customerId",
  as: "orders",
});

Order.belongsTo(User, {
  foreignKey: "customerId",
  as: "user",
});

/* =====================================
   Order - OrderItem (1 : N)
===================================== */

Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "items",
});

OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

/* =====================================
   Product - OrderItem (1 : N)
===================================== */

Product.hasMany(OrderItem, {
  foreignKey: "productId",
  as: "orderItems",
});

OrderItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

/* =====================================
   Order - Invoice (1 : 1)
===================================== */

Order.hasOne(Invoice, {
  foreignKey: "orderId",
  as: "invoice",
});

Invoice.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

/* =====================================
   Order - OrderWithDeliverie (1 : 1)
===================================== */

Order.hasOne(OrderWithDeliverie, {
  foreignKey: "orderId",
  as: "delivery",
});

OrderWithDeliverie.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

/* =====================================
   DelivererPerson - OrderWithDeliverie
   (1 : N)
===================================== */

DelivererPerson.hasMany(OrderWithDeliverie, {
  foreignKey: "deliveryPersonId",
  as: "deliveries",
});

OrderWithDeliverie.belongsTo(DelivererPerson, {
  foreignKey: "deliveryPersonId",
  as: "delivererPerson",
});

/* =====================================
   User - Employee (1 : 1)
===================================== */

User.hasOne(Employee, {
  foreignKey: "userId",
  as: "employee",
});

Employee.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

/* =====================================
   Employee - DelivererPerson (1 : 1)
===================================== */

Employee.hasOne(DelivererPerson, {
  foreignKey: "employeeId",
  as: "deliverer",
});

DelivererPerson.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});

/* =====================================
   Employee - Secretary (1 : 1)
===================================== */

Employee.hasOne(Secretary, {
  foreignKey: "employeeId",
  as: "secretary",
});

Secretary.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});

/* =====================================
   User - Supplier (1 : 1)
===================================== */

User.hasOne(Supplier, {
  foreignKey: "userId",
  as: "supplier",
});

Supplier.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

/* =====================================
   DelivererPerson - DayWork (N : N)
===================================== */

DelivererPerson.belongsToMany(DayWork, {
  through: "deliverer_dayWorks",

  foreignKey: {
    name: "delivererId",
    field: "delivererid",
  },

  otherKey: {
    name: "dayWorkId",
    field: "dayWorkid",
  },

  as: "dayWorks",
});

DayWork.belongsToMany(DelivererPerson, {
  through: "deliverer_dayWorks",

  foreignKey: {
    name: "dayWorkId",
    field: "dayWorkid",
  },

  otherKey: {
    name: "delivererId",
    field: "delivererid",
  },

  as: "deliverers",
});

export { sequelize };