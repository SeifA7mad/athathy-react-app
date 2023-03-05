interface CategoryType {
  name: string;
  image: string;
  parentId?: string;
  status: 'Active' | 'Hold' | 'Deleted';
  level: number;
  createdAt: number;
  updatedAt: number;
}


export interface MainCategoryType extends CategoryType {
  id: string;
  banner?: string;
  priority: number;
  homePriority: number;
  keywords: any[];
  slug: string;
  tags: any[];
  productCount: number;
}

export interface ChildrenCategoryType extends CategoryType {
  children: MainCategoryType[];
}