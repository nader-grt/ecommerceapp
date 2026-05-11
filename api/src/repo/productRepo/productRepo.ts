import { Op } from "sequelize";
import ProductDomain from "../../models/domain/productDoman/ProductDomain";
import { Category, Product, sequelize } from "../../models/main";
import productRepoInterface from "./productRepoInterface";
import QueryBuilder from "../../util/QuiryBuilder";

export default class ProductRepo extends productRepoInterface {

  private cache: any = null;
  private cacheTime = 0;

  /* =====================================
     FIND ALL PRODUCTS
  ===================================== */
  public async FindAllProducts(): Promise<any> {
    try {
      return await Product.findAll({
        include: [{ model: Category, as: "category" }],
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /* =====================================
     GET PRODUCT BY ID
  ===================================== */
  public async GetProductById(id: number): Promise<any> {
    try {
      return await Product.findOne({
        where: { id },
        include: [{ model: Category, as: "category" }],
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /* =====================================
     CREATE PRODUCT
  ===================================== */
  public async createProduct(product: any): Promise<any> {
    const t = await sequelize.transaction();

    try {
      const created = await Product.create(product, {
        transaction: t,
      });

      await t.commit();

      return created;

    } catch (error) {
      await t.rollback();
      console.log(error);
      throw error;
    }
  }

  /* =====================================
     DELETE PRODUCT
  ===================================== */
  public async DeleteProductById(id: number): Promise<any> {
    try {
      const deleted = await Product.destroy({
        where: { id },
      });

      return deleted > 0
        ? { success: true }
        : { success: false, message: "Product not found" };

    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  /* =====================================
     CHECK EXISTENCE
  ===================================== */
  public async IsExistProductByName(name: string): Promise<boolean> {
    try {
      const product = await Product.findOne({
        where: { name },
      });

      return !!product;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* =====================================
     RANDOM PRODUCTS (CACHE)
  ===================================== */
  private async getRandomProducts(limit: number): Promise<any> {
    try {
      const maxId :any = await Product.max("id");

      if (!maxId) return [];

      const randomId = Math.floor(Math.random() * maxId);

      return await Product.findAll({
        where: {
          id: {
            [Op.gte]: randomId,
          },
        },
        limit,
        order: [["id", "ASC"]],
      });

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  public async getRandomProductsCached(limit: number): Promise<any> {
    const now = Date.now();

    if (this.cache && now - this.cacheTime < 5 * 60 * 1000) {
      return this.cache;
    }

    const data = await this.getRandomProducts(limit);

    this.cache = data;
    this.cacheTime = now;

    return data;
  }

  /* =====================================
     PRODUCTS BY CATEGORY
  ===================================== */
  public async getProductByCategoryId(categoryId: number): Promise<any> {
    try {
      const products = await Product.findAll({
        where: { categoryId },
      });

      return {
        products,
        count: products.length,
      };

    } catch (error) {
      console.log(error);
      return { products: [], count: 0 };
    }
  }

  /* =====================================
     COUNT BY CATEGORY
  ===================================== */
  public async getProductCountByCategoryId(categoryId: number): Promise<number> {
    try {
      return await Product.count({
        where: { categoryId },
      });
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  /* =====================================
     FILTER PRODUCTS
  ===================================== */
  public async getAllProductsFiltred(cleanQuery: any): Promise<any> {
    try {
      const qb = new QueryBuilder(cleanQuery, Product)
        .filter()
        .sort()
        .paginate();

      const options = qb.build();

      const { rows, count } = await Product.findAndCountAll({
        ...options,
      });

      return {
        data: rows,
        total: count,
      };

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}