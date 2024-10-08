export interface Category {
  categoryId?: string;
  name?: string;
  depth?: number;
  _url?: string;
  slug?: string;
  imageUrl?:string;
  parentId?: string;
  subCategories?: Category[];
}
