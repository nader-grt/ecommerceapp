import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import CreateProductUseCase from "../../useCases/productUseCase/createProductUseCase";

export default class CreateProductController extends BaseController {

  private _usecasecreateProduct: CreateProductUseCase;

  constructor(createProductUseCase: CreateProductUseCase) {
    super();
    this._usecasecreateProduct = createProductUseCase;
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<any> {

    try {

      console.log("REQ BODY:", req.body);

      const {
        name,
        price,
        categoryId,
        supplierId
      } = req.body;

      const file = req.file;

      /* =========================
         Validation
      ========================= */

      if (!name) {
        return this.badRequest(res, "Product name is required");
      }

      if (!price) {
        return this.badRequest(res, "Product price is required");
      }

      if (!categoryId) {
        return this.badRequest(res, "Category is required");
      }

      if (!file) {
        return this.badRequest(
          res,
          "Product image is required"
        );
      }

      const parsedPrice = Number(price);

      if (isNaN(parsedPrice)) {
        return this.badRequest(
          res,
          "Invalid product price"
        );
      }

      /* =========================
         DTO
      ========================= */

      const dto = {
        nameProduct: name,
        priceProduct: parsedPrice,
        categoryIdProduct: Number(categoryId),

        supplierIdProduct: supplierId
          ? Number(supplierId)
          : null,

        imageName: file.filename,
      };

      console.log("DTO READY:", dto);

      /* =========================
         Execute Use Case
      ========================= */

      const result =
        await this._usecasecreateProduct.execute(dto);

      return this.resultValue(
        res,
        "Product created successfully",
        result.data
      );

    } catch (error) {

      console.log(error);

      return this.fail(
        res,
        "Internal server error"
      );
    }
  }
}