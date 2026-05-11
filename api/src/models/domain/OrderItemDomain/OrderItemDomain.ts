


export default class OrderItemDomain 
{



  constructor(
    private productId: number,
    private productName: string,
    private quantity: number,
    private unitPrice: number = 1 
  ) {}

  getTotalPrice(): number {
    return this.quantity * this.unitPrice;
  }


}