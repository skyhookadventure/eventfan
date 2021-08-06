import Product from "./shared/Product";

export default interface ProductListViewedProps {
  list_id?: string;
  category?: string;
  products?: Product[];
}
