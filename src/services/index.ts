import { IUser } from "./interfaces";
import { IProducts } from "./interfaces";

export function getUser(): Promise<IUser> {
  return new Promise(async (resolve, reject) => {
    try {
      const endpoint = "https://coding-challenge-api.aerolab.co/user/me";

      const requestInit: RequestInit = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRkOWU5OTQ0NGZlNDAwNmRhOTkyNGQiLCJpYXQiOjE1OTE1ODIzNjF9.-f40dyUIGFsBSB_PTeBGdSLI58I21-QBJNi9wkODcKk",
        },
      };

      const res = await fetch(endpoint, requestInit);
      const jsonRes = await res.json();

      const userResolve: IUser = {
        name: jsonRes.name,
        points: jsonRes.points,
        redeemHistory: jsonRes.redeemHistory,
      };
      resolve(userResolve);
    } catch (error) {
      reject(new Error(error));
    }
  });
}

export function getProduct(): Promise<IProducts[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const endpoint = "https://coding-challenge-api.aerolab.co/products";
      const requestInit: RequestInit = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRkOWU5OTQ0NGZlNDAwNmRhOTkyNGQiLCJpYXQiOjE1OTE1ODIzNjF9.-f40dyUIGFsBSB_PTeBGdSLI58I21-QBJNi9wkODcKk",
        },
      };

      const resProducto = await fetch(endpoint, requestInit);
      const jsonResProduct = await resProducto.json();
      
      const productResolve: IProducts[] = jsonResProduct.map((prod: { _id:any; category: any; cost: any; img: any; name: any; }) => {
        return {
          id:prod._id,
          category: prod.category,
          cost: prod.cost,
          img: prod.img,
          name: prod.name
        }
      })
      resolve(productResolve);
    } catch (error) {
      reject(new Error(error));
    }
  });
}

export function redeemProduct(id:string){
  
  return new Promise(async (resolve,reject) => {
    try { 
      const obj = {productId : id}
      const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
      const endpoint = 'https://coding-challenge-api.aerolab.co/redeem';
      const requestInit:  RequestInit = {
        body: blob,
        method:'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRkOWU5OTQ0NGZlNDAwNmRhOTkyNGQiLCJpYXQiOjE1OTE1ODIzNjF9.-f40dyUIGFsBSB_PTeBGdSLI58I21-QBJNi9wkODcKk",
        },
      }

      const resRedeem = await fetch(endpoint,requestInit);
      const jsonResRedeem = resRedeem.json()
      
      resolve(jsonResRedeem)
    } catch (error) {
      reject(new Error(error))
    }
  })
}