import DeleveryPersonDomain from "../DeleveryPersonDomain/DelevryPersonDomain";


export default class DeleveryWithDaysWorkDomain extends DeleveryPersonDomain {
  private nbrHours!: number;
  private dayWorkid!: number;
  private delivererid!: number;

  constructor() {
    super();
    //   this.firstName = "" ;
    //     this.lastName ;
    //     this.phone =""
    //     this.email = ""

    // this.city = "" ;
    // this.address  = "" ;
  }
  public get getNbrHours(): number {
    return this.nbrHours;
  }

  public set setNbrHours(nbrHours: number) {
    this.nbrHours = nbrHours;
  }
  public get getDayWorkid(): number {
    return this.dayWorkid;
  }
  public set setDayWorkid(dayWorkId: number) {
    this.dayWorkid = dayWorkId;
  }
  public get GetDelivererId(): number {
    return this.delivererid;
  }
  public set setDelivererId(delivererId: number) {
    this.delivererid = delivererId;
  }
}
