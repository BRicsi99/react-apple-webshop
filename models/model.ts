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

export interface SignInFormDataProperties {
  email: string;
  password: string;
}

export interface SignUpFormDataProperties {
  name: string;
  email: string;
  password: string;
}

export interface FormDataCopyProperties {
  name: string;
  email: string;
  password?: string;
  timestamp?: any;
}

export interface UserType {
  email: string | null;
  uid: string | null;
  name: string | null;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  updateCart: (itemId: number, isIncrease: boolean) => void;
  emptyCart: () => void;
}
