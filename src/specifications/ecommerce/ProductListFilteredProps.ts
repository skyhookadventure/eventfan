import Product from "./shared/Product";

export default interface ProductListFilteredProps {
  list_id?: string;
  category?: string;
  filters?: {
    type?: string;
    value?: string;
  }[];
  sorts?: {
    type?: string;
    value?: string;
  }[];
  products?: Product[];
}
