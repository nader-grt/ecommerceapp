


export default abstract class IInterfaceSecretaryRepo
{

     public abstract CreateSecretary(secretary :any):Promise<any> ;

     public abstract GetSecretary(secretary :any):Promise<any> ;
     public abstract DeleteSecretary(secretary :any):Promise<any> ;
     public abstract UpdateSecretary(secretary :any):Promise<any> ;
}