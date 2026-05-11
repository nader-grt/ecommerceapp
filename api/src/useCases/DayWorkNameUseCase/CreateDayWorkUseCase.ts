import DayWorkDomain from "../../models/domain/DayWorkDomain/DayWorkDomain";
import DayWorkRepo from "../../repo/dayWorkRepo/DayWorkRepo";


export default class CreateDayWorkUseCase {
  constructor(private dayWorkRepo: DayWorkRepo) {}

  async execute(nameDay: string): Promise<DayWorkDomain> {
   
    const dayWork = new DayWorkDomain();
    dayWork.setNameDay = nameDay;

    
    const createdDay = await this.dayWorkRepo.createNameDay(dayWork);

    return createdDay;
  }
}
