import { Request, Response, Router } from "express";
import createCategoryController from "../../controllers/category/createCategoryController.";
import GetCategoryController from "../../controllers/category/GetCategoryController";
import { verifyToken } from "../../middleware/verifyToken";
import CategoryRepo from "../../repo/categoryRepo/categoryRepo";
import GetCategoryUseCase from "../../useCases/categoryUseCase/GetCategoryUseCase";


const router = Router();

const repo = new CategoryRepo() ;
const getCategoryUseCase = new GetCategoryUseCase(repo)

const getCategoryRoute  =  new GetCategoryController(getCategoryUseCase)






router.get("/categories/:id",verifyToken, (req:Request,res:Response) => {
        console.log("req" , req.body)
        getCategoryRoute.execute(req,res)
})



export default router