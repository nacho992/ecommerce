export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    img: string;
    inCart?: boolean;
    count?: number
}