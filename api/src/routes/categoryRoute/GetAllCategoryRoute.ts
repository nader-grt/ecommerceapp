import { Request, Response, Router } from "express";
import GetAllCategoriesController from "../../controllers/category/GetAllCategoriesController";
import { verifyToken } from "../../middleware/verifyToken";
import CategoryRepo from "../../repo/categoryRepo/categoryRepo";
import GetAllCategoriesUseCase from "../../useCases/categoryUseCase/GetAllCategoriesUseCase";





const router = Router() ;


        const       usecaseRepo   = new CategoryRepo();
        const getAllCategoriesUseCase  = new GetAllCategoriesUseCase(usecaseRepo)

const getAllCategoriesRoute = new GetAllCategoriesController(getAllCategoriesUseCase)




router.get("/categories",verifyToken,(req:Request,res:Response)=> {

    getAllCategoriesRoute.execute(req,res)  ;

})



export default router 