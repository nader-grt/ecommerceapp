import { Request, Response } from "express";
import { BaseController } from "../../infra/BaseCOntroller";
import SecretaryDomain from "../../models/domain/SecretaryDomain/SecretaryDomain";
import SecretaryRepo from "../../repo/SecretaryRepo/SecretaryRepo";







export default class DeleteSecretaryController  extends BaseController
{


    private _secretaryDomain:SecretaryDomain;
    private _secretaryRepo:SecretaryRepo

    constructor()
    {
        super() ;
        this._secretaryDomain = new SecretaryDomain() ;
        this._secretaryRepo =  new SecretaryRepo()
    }

    protected async  executeImpl(req: Request, res: Response): Promise<any> {
        
    }
}