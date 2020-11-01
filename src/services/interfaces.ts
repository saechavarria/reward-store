export interface IUser {
  name: string;
  points: number;
}

export interface IProducts {
  id: string;
  name: string;
  cost: number;
  category: string;
  img: {
    hdUrl: string;
    url: string;
  };
}

export interface ICardContainerProps {
  product: IProducts;
}

export interface IAppContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>
}