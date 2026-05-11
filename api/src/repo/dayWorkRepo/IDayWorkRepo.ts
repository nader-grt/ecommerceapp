


export default abstract class IDayWorkRepo {

    public  abstract      createNameDay(workDay:any):Promise<any>;
  
    public  abstract      GetAllNameDays():Promise<any>;
  
   // public abstract getUserNameDayById(id: number): Promise<any> ;
  }
  