//Типы для слоя сервисов
export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    sale_price: number;
    image: string;
    status: string[];
  };

export type ProductsJson = {
    "products": Product[]
};

export type NoIdProduct = {
  name: string;
  description: string;
  price: number;
  sale_price: number;
  image: string;
  status: string[];
}