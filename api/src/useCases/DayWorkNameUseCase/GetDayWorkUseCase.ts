import DayWorkRepo from "../../repo/dayWorkRepo/DayWorkRepo";


export default class GetDayWorkUseCase {
  constructor(private dayWorkRepo: DayWorkRepo) {}

  async execute(): Promise<any> {
    const days = await this.dayWorkRepo.GetAllNameDays();

    return days.map((day:any) => ({
      id: day.id,
      nameDay: day.nameDay,
    }));
  }
}
