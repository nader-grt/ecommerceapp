import { DayWork } from "../../models/main";
import IDayWorkRepo from "./IDayWorkRepo";

export default class DayWorkRepo extends IDayWorkRepo
{


    public  async      createNameDay(workDay:any):Promise<any>
    {

          try {

                     await DayWork.create(workDay)
            
          } catch (error) {
            console.log(error)
          }
    }
  
    public  async      GetAllNameDays():Promise<any>
    {

               try {
              const nameDays =    await DayWork.findAll() ;

              return nameDays ;
               } catch (error) {
                
               }
    }
 
    public  static async FindNameDayByWorkDayId(workDayId: number): Promise<any> 
    {
             try {

              console.log("repoooooooooo  workDayId  ",workDayId)
          const nameDayWork :any =    await DayWork.findOne({
               where :{ id:workDayId},
               raw:true
              })

              return nameDayWork === null ? null : nameDayWork ;
             } catch (error) {
                     console.log(error)
             }

    }
}