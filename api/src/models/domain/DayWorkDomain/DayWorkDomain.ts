

export default class DayWorkDomain
{

    private nameDay:string = "";
 
      
      constructor() {
       // super();
        this.nameDay ;
      }

      public get getNameDay():string
      {
        return this.nameDay ;
      }
      public set setNameDay(nameDay :string)
      {
         this.nameDay = nameDay;
      }
    
}