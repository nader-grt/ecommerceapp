import { User } from "../../models/main";
import IInterfaceSecretaryRepo from "./IInterfaceSecretaryRepo";




export default class SecretaryRepo  extends IInterfaceSecretaryRepo
{


    public async CreateSecretary(secretary :any):Promise<any>
    {

         try {
          
         } catch (error) {
          console.log(error)
         }
    }


    public async GetSecretary(secretary :any):Promise<any> 
    {

 
                        
         try {
          
         } catch (error) {
          console.log(error)
         }

    }
    public async DeleteSecretary(secretary :any):Promise<any> 
    {
             
         try {
          
         } catch (error) {
          console.log(error)
         }

    }
    public async UpdateSecretary(secretary :any):Promise<any> 
    {
          
         try {
          
         } catch (error) {
          console.log(error)
         }

    }


    public static  async getSecretaryIsUser():Promise<any>
    {
           try {
                       

            const secretaries = await User.findAll({
                attributes: [
                  ['id', 'SecretaryId'],
                  'firstName',
                  ['role', 'SecretaryRole']
                ],
                where: {
                  role: 'secrtrie'
                },
                raw: true
              });
              
             return secretaries

           } catch (error) {
            
           }

    }
}