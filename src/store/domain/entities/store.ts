import { randomUUID } from 'node:crypto';

type StoreConstructor = {
  address: string;
  email: string;
  name: string;
  phone: string;
};

export class Store {
  private _address: string;
  private _email: string;
  private _id: string;
  private _name: string;
  private _phone: string;

  constructor({ address, email, name, phone }: StoreConstructor) {
    this._address = address;
    this._email = email;
    this._id = randomUUID();
    this._name = name;
    this._phone = phone;
  }

  get address() {
    return this._address;
  }

  get email() {
    return this._email;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get phone() {
    return this._phone;
  }

  set address(address: string) {
    this._address = address;
  }

  set email(email: string) {
    this._email = email;
  }

  set name(name: string) {
    this._name = name;
  }

  set phone(phone: string) {
    this._phone = phone;
  }
}