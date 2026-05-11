


export default abstract class IEmployeeRepoInterface
{
    
    protected abstract getEmployeeById(id :number):Promise<any> ;
    protected abstract createEmployee(emp:any,userid:number):Promise<any> ;
    protected abstract updateEmployee(emp:any,userid:number):Promise<any> ;
    protected abstract deleteEmployee(id:number):Promise<any> ;
    protected abstract FindUserById(userId:number):Promise<any> ;
    protected  abstract FindEmployeeBefore(userId?:number ,dayWorkid?:number):Promise<boolean | any>;
}