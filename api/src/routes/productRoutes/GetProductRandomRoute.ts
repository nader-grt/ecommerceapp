import { Request, Response, Router } from "express";
import GetProductRandomUseCase from "../../useCases/productUseCase/GetProductRandomUseCase";
import ProductRepo from "../../repo/productRepo/productRepo";
import GetProductRandomController from "../../controllers/products/GetProductRandomController";



const router =Router()


const productRepo = new ProductRepo()

  const getProductRandomUseCase  = new GetProductRandomUseCase(productRepo) ;
  const getProductRandomController  = new GetProductRandomController(getProductRandomUseCase)


// random product 
  router.get("/products/home",(req:Request,res:Response)  => {


    getProductRandomController.execute(req,res)

  })


  export default router ;