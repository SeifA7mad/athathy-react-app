export interface CategoryType {
  id: string;
  name: string;
  image: string;
  banner?: string;
  parentId?: string;
  level: number;
  priority: number;
  homePriority: number;
  keywords: any[];
  slug: string;
  tags: any[];
  productCount: number;
  status: 'Active' | 'Hold' | 'Deleted';
  createdAt: number;
  updatedAt: number;
}
