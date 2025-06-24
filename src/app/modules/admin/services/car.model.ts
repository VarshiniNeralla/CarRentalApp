// export class Car {
// }

export class Car {
    id?: string; 
    brand: string;
    name: string;
    type: string;
    color: string;
    year: number;
    transmission: string;
    description: string;
    price: number;
    img: string;
  
    constructor(
      brand: string,
      name: string,
      type: string,
      color: string,
      year: number,
      transmission: string,
      description: string,
      price: number,
      img: string
    ) {
      this.brand = brand;
      this.name = name;
      this.type = type;
      this.color = color;
      this.year = year;
      this.transmission = transmission;
      this.description = description;
      this.price = price;
      this.img = img;
    }
  }
  