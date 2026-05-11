export default class ProductDomain {

  private name!: string;
  private price!: number;
  private nameImage!: string;

  constructor(props?: {
    name: string;
    price: number;
    nameImage: string;
  }) {
    if (props) {
      this.name = props.name;
      this.price = props.price;
      this.nameImage = props.nameImage;
    }
  }

  get getName() {
    return this.name;
  }

  set setName(value: string) {
    this.name = value;
  }

  get getPrice() {
    return this.price;
  }

  set setPrice(value: number) {
    if (value <= 0) throw new Error("Invalid price");
    this.price = value;
  }

  get getImage() {
    return this.nameImage;
  }

  set setImage(value: string) {
    this.nameImage = value;
  }
}