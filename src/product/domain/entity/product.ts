import { randomUUID } from 'node:crypto'

type ProductConstructor = {
  description: string;
  name: string;
  price: number;
};

export class Product {
  private _description: string;
  private readonly _id: string;
  private _name: string;
  private _price: number;

  constructor({ description, name, price }: ProductConstructor) {
    this._description = description;
    this._id = randomUUID();
    this._name = name;
    this._price = price;
  }

  get description() {
    return this._description;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  set description(description: string) {
    this._description = description;
  }

  set name(name: string) {
    this._name = name;
  }

  set price(price: number) {
    this._price = price;
  }
}