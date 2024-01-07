export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartItem {
  id: number;
  title: string;
  thumbnail: string;
  quantity: number;
}

export interface PurchaseProps {
  id: number;
  quantity: number;
  thumbnail: string;
  title: string;
}
export interface PurchasesProps {
  id: string;
  data: {
    items: PurchaseProps[];
    userId: string;
    timestamp: {
      nanoseconds: number;
      seconds: number;
    };
  };
}