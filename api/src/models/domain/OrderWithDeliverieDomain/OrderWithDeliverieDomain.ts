enum DELIVERY_STATUS {
    PENDING_PICKUP = 'PENDING_PICKUP',
    IN_TRANSIT = 'IN_TRANSIT',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
  }
  
 export default class OrderWithDeliverieDomain {
    private orderId: number;
    private deliveryPersonId!: number | undefined;
    private status: DELIVERY_STATUS;
    private pickedUpAt?: Date;
    private deliveredAt?: Date;
  
    constructor(orderId: number) {
      this.orderId = orderId;
      this.status = DELIVERY_STATUS.PENDING_PICKUP;
      this.deliveryPersonId = undefined;
    }
  
    assignDeliveryPerson(personId: number) {
      // if (this.status !== DELIVERY_STATUS.PENDING_PICKUP) {
      //   throw new Error("cannot assign delivery after pickup");
      // }
      console.log("********************************************/////////////////////////////   ")
      this.deliveryPersonId = personId;
    }

    static reStoreOrBuildOrder(data: {
   
      orderId: number;
      status: DELIVERY_STATUS;
      // pickedUpAt: Date,
     //  deliveredAt:Date,
     deliveryPersonId?: number | null;
    }) {
      const orderToDel = new OrderWithDeliverieDomain(data.orderId);
    
      orderToDel.status = data.status;
      if (data.deliveryPersonId != null) {
        orderToDel.deliveryPersonId = data.deliveryPersonId;
      }
     //  orderToDel.pickedUpAt = data.pickedUpAt;
      // orderToDel.deliveredAt= data.deliveredAt ;
 
    
      return orderToDel;
    }

  
    pickUp(personId: number) {
      if (this.deliveryPersonId !== personId) {
        throw new Error("not authorized");
      }
      if (this.status !== DELIVERY_STATUS.PENDING_PICKUP) {
        throw new Error("order already picked up");
      }
      this.status = DELIVERY_STATUS.IN_TRANSIT;
      this.pickedUpAt = new Date();
    }
  
    markAsDelivered(personId: number) {
      if (this.deliveryPersonId !== personId) {
        throw new Error("not authorized");
      }
      if (this.status !== DELIVERY_STATUS.IN_TRANSIT) {
        throw new Error("cannot deliver before pickup");
      }
      this.status = DELIVERY_STATUS.DELIVERED;
      this.deliveredAt = new Date();
    }
  
    cancel() {
      if (this.status === DELIVERY_STATUS.DELIVERED) {
        throw new Error("cannot cancel delivered delivery");
      }
      this.status = DELIVERY_STATUS.CANCELLED;
    }

    public get GetDeliveryPersonId():number 
    {

      if (this.deliveryPersonId == null) {
        throw new Error("Delivery person not assigned");
      }
       return this.deliveryPersonId
    }

    public get getStatus():DELIVERY_STATUS
    {
       return this.status
    }
    public get getPickedAt()
    {
       return this.pickedUpAt
    }
    public get getDeliveredAt()
    {
       return this.deliveredAt
    }
    public get getOrderId()
    {
       return this.orderId
    }
  }