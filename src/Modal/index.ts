export interface CartInfo {
  id: number;
  name: string;
  address: string;
  cartItem: string;
  quantity: number;
}

export interface Product {
  id: string;
  imgUrl: string;
  price: number;
  name: string;
  quantity: number;
}
