export default abstract class productRepoInterface {

  protected abstract FindAllProducts(): Promise<any>;

  protected abstract GetProductById(id: number): Promise<any>;

  protected abstract DeleteProductById(id: number): Promise<any>;

  protected abstract createProduct(product: any): Promise<any>;

  protected abstract getRandomProductsCached(limit: number): Promise<any>;

  protected abstract getProductByCategoryId(categoryId: number): Promise<any>;

  protected abstract getAllProductsFiltred(cleanQuery: any, notFiltred: any): Promise<any>;

  protected abstract getProductCountByCategoryId(categoryId: number): Promise<number>;
}