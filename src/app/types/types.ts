//Типы для слоя сервисов
export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    sale_price: number;
    image: string;
    status: string[];
    quantity: number;
  };

export type ProductsJson = {
    "products": Product[]
};

export type NoIdProduct = Omit<Product, 'id'>;

export type StockCreate = {
  "productid": string;
  "quantity": number;
};
export type StockQuantity = Omit<StockCreate, 'productid'>;

export type UserBody = {
  "id": string;
  "login": string;
  "password": string;
}