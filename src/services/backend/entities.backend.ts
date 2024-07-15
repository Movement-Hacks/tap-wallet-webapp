export interface AccountEntity {
  accountId: string;
  address: string;
  balance: number;
  level: number;
  progress: number;
  autoTapperLevel: number;
  createdAt: Date;
  updatedAt: Date;
}
