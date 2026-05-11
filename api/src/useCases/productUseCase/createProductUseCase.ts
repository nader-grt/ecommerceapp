import FileHandler from "../../filesystem/fileHandle";
import ProductDomain from "../../models/domain/productDoman/ProductDomain";
import CategoryRepo from "../../repo/categoryRepo/categoryRepo";
import ProductRepo from "../../repo/productRepo/productRepo";
import SupplierRepo from "../../repo/SupplierRepo/SupplierRepo";

interface CreatProductDTO {
  nameProduct: string;
  priceProduct: number;
  categoryIdProduct: number;
  supplierIdProduct: number | null;
  imageName: string;
}

export default class CreateProductUseCase {

  private _productRepoUseCase: ProductRepo;
  private _fileHandlerUseCase: FileHandler;
  private _categoryRepoUseCase: CategoryRepo;
  private _supplierRepoUseCase: SupplierRepo;

  constructor(
    fileHandlerUseCase: FileHandler,
    productUseCase: ProductRepo,
    categoryRepo: CategoryRepo,
    supplierRepo: SupplierRepo
  ) {
    this._productRepoUseCase = productUseCase;
    this._fileHandlerUseCase = fileHandlerUseCase;
    this._categoryRepoUseCase = categoryRepo;
    this._supplierRepoUseCase = supplierRepo;
  }

  async execute(dto: CreatProductDTO): Promise<any> {
    try {

      const {
        nameProduct,
        priceProduct,
        categoryIdProduct,
        supplierIdProduct,
        imageName,
      } = dto;

      /* =====================
         VALIDATION
      ===================== */

      if (!nameProduct) throw new Error("Name required");

      if (priceProduct === null || priceProduct === undefined) {
        throw new Error("Price required");
      }

      const category =
        await this._categoryRepoUseCase.GetCategoryById(
          Number(categoryIdProduct)
        );

      if (!category) throw new Error("Category not found");

      const supplier = supplierIdProduct
        ? await this._supplierRepoUseCase.GetSupplierByID(
            Number(supplierIdProduct)
          )
        : null;

      const supId = supplier ? supplier.id : null;

      const isExist =
        await this._productRepoUseCase.IsExistProductByName(
          nameProduct
        );

      if (isExist) throw new Error("Product already exists");

      /* =====================
         DOMAIN
      ===================== */

      const product = new ProductDomain();

      product.setName = nameProduct;
      product.setPrice = Number(priceProduct);
      product.setImage = imageName;

      /* =====================
         PERSIST
      ===================== */

      const createdProduct =
        await this._productRepoUseCase.createProduct({
          name: product.getName,
          price: product.getPrice,
          nameImage: imageName,
          categoryId: category.id,
          supplierId: supId,
          isDeleted: false,
        });

      return {
        success: true,
        data: createdProduct,
      };

    } catch (error: any) {

      if (dto.imageName) {
        await this._fileHandlerUseCase.removeFile(dto.imageName);
      }

      return {
        success: false,
        message: error.message,
      };
    }
  }
}