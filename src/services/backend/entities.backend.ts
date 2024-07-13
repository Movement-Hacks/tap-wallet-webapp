export interface AccountEntity {
  accountId: string;
  address: string;
  game: GameEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameEntity {
  gameId: string;
  balance: number;
  totalBonus: number;
  accountId: string;
  account: AccountEntity;
  createdAt: Date;
  updatedAt: Date;
}
