export type StorageCategory = 
  | 'Feed Storage'
  | 'Grain Storage'
  | 'Equipment Storage'
  | 'Tank / Bin Capacity'
  | 'Inventory Planning'
  | 'Spoilage Reduction'
  | 'Water Quality & EPA Compliance'
  | 'FIFO Rotation';

export type VerificationStatus = 
  | 'Pending Human Verification'
  | 'Filing Complete'
  | 'Action Required'
  | 'Red Flag - MCL Exceeded';

export interface StorageTool {
  id: string;
  title: string;
  description: string;
  category: StorageCategory;
  primaryOutcome: string;
  verificationStatus: VerificationStatus;
  path: string;
}

export interface FavoriteConfig {
  toolIds: string[];
}
