export interface IItem {
  id?: string;
  name: string;
  price: number | string;
  url: string;
}

export interface IAlert {
  show: boolean;
  text: string;
}
