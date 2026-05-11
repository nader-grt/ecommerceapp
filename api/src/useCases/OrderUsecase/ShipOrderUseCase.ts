import OrderRepo from "../../repo/OrderRepo/OrderRepo";

interface IShipOrderDTO {
  orderId: number;
  actor: {
    ownerId: number;
    ownerRole: string;
    ownerEmail?: string;
  };
}

export default class ShipOrderUseCase {
  private _orderRepo!: OrderRepo;
  constructor(orderRepo: OrderRepo) {
    this._orderRepo = orderRepo;
  }

  async execute(dto: IShipOrderDTO): Promise<any> {
    try {
      console.log("dddddddddd ship ", dto);
      const order = await this._orderRepo.FindOrderById(dto.orderId);
      console.log("oooooooo  ", order);

      //// customerId orderId
      const result = await this._orderRepo.ShipOrderByOrderByAdmin({
        orderId: order.id,
        customerId: order.customerId,
      });
      if (!result.success) {
        return { success: false };
      }
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }
}
