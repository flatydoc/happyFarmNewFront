export interface IGood {
  id: number;
  name: string;
  level: number;
  subCategoryId: number;
  categoryId: number;
  text: string;
  priceCoef: number;
  profitCoef: number;
  price: number;
  profit: number;
  defaultPrice: number;
  defaultProfit: number;
  condition: ICondition | null;
}

export interface ICondition {
  id: number;
  level: number;
}

export interface IUserData {
  username: string;
  telegramId: string;
  balance: number;
  level: number;
  goods: IGood[];
  boosts: IBoost[];
  tasks: ITask[];
  energy: number;
  profit: number;
  inviteLink: string;
  lang: string;
  lastEntry: Date;
  passiveIncome: number;
}

export interface IUserDataContext {
  balance: number;
  energy: number;
  level: number;
  profitPerHour: number;
  setBalance: (balance: number) => void;
  setEnergy: (energy: number) => void;
  setLevel: (level: number) => void;
  setProfitPerHour: (profitPerHour: number) => void;
}

export interface IStateContextType {
  displayBalance: number;
  setDisplayBalance: React.Dispatch<React.SetStateAction<number>>;
  turboTap: number;
  setTurboTap: React.Dispatch<React.SetStateAction<number>>;
  displayEnergy: number;
  setDisplayEnergy: React.Dispatch<React.SetStateAction<number>>;
  profitPerHour: number;
  setProfitPerHour: React.Dispatch<React.SetStateAction<number>>;
  goods?: IGood[];
  boosts?: IBoost[];
  tasks?: ITask[];
  level: number;
  turbo: boolean;
  handleTurboMode: () => void;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  passiveIncome?: number;
  setPassiveIncome: React.Dispatch<React.SetStateAction<number>>;
  isShowPassiveRewardPopup: boolean;
  setIsShowPassiveRewardPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFriend {
  id: number;
  username: string;
  level: number;
  balance: number;
}

export interface ILeader {
  telegramId: number;
  username: string;
  level: number;
  balance: number;
}

export interface IBoost {
  id: number;
  name: string;
  limit: number;
  available: number;
  boostType: string;
  lastUsed: null | Date;
}

export interface ITask {
  id: number;
  name: string;
  reward: number;
  isComplete: boolean;
  url: string;
}
