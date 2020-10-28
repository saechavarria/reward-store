export interface IUser {
    name: string;
    points: number;
    redeemHistory: any[]
} 

export interface IProducts {
    id: string;
    name: string;
    cost: number;
    category: string;
    img: {
        hdUrl:string;
        url:string;
    };
}

export interface ICardContainerProps {
    product: IProducts
}