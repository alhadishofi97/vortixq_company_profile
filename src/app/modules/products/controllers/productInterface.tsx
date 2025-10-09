
export interface ProductResponse {
  data: Product[];
}

export interface Product {
  id: number;
  documentId: string;
  id_content: string;
  title: string;
  description: string;
  dashboardImage: DashboardImage;
  icon: string;
  details: Details;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: MinimalUser;
  updatedBy: MinimalUser;
  locale: string;
  localizations: Product[];
  judul2: string;
  subjudul2: string;
  data: Data[];
}

export interface DashboardImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  related: MinimalRelated[];
  folder: Folder;
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: MinimalUser;
  updatedBy: MinimalUser;
  locale: string;
  localizations: MinimalRelated[];
}

export interface Folder {
  id: number;
  documentId: string;
  name?: string;
  pathId?: number;
  parent?: MinimalFolder;
  children?: MinimalFolder[];
  files?: DashboardImage[];
  folderPath?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdBy?: MinimalUser;
  updatedBy?: MinimalUser;
  locale?: string;
  localizations?: MinimalFolder[];
}

export interface MinimalFolder {
  id: number;
  documentId: string;
}

export interface MinimalRelated {
  id: number;
  documentId: string;
}

export interface Details {
  id: number;
  features: Feature[];
  capabilities: Capability[];
}

export interface Feature {
  id: number;
  list: string;
}

export interface Capability {
  id: number;
  list: string;
}

export interface MinimalUser {
  id: number;
  documentId: string;
}


export interface Product2 {
  id: string;
  title: string;
  description: string;
  dashboardImage: string; // path atau URL ke image
  icon: string;        // SVG atau komponen React lain
  details: ProductDetails2;
  data:Data[];
  judul2: string;
  subjudul2: string;
}

export interface ProductDetails2 {
  features: string[];
  capabilities: string[];
}


export interface Data {
  id: number;
  img: Img;
  judul: string;
  narasi: string;
  fitur: string;
  capabilities?: string; // Optional field untuk capabilities
}

export interface Img {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  related: Related[];
  folder: Folder;
  folderPath: string;
  createdAt: string; // ISO datetime string
  updatedAt: string;
  publishedAt: string;
  createdBy: CreatedBy;
  updatedBy: UpdatedBy;
  locale: string;
  localizations: Localization[];
}

export interface Related {
  id: number;
  documentId: string;
}

export interface Folder {
  id: number;
  documentId: string;
}

export interface CreatedBy {
  id: number;
  documentId: string;
}

export interface UpdatedBy {
  id: number;
  documentId: string;
}

export interface Localization {
  id: number;
  documentId: string;
}
