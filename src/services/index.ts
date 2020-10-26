import { User } from "./interfaces";
import { Product } from "./interfaces";

export function getUser(): Promise<User> {
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

      const userResolve: User = {
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

export function getProduct(): Promise<Product> {
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

      const res = await fetch(endpoint, requestInit);
      const jsonRes = await res.json();
      
      const productResolve: Product = {
        category: jsonRes.category,
        cost: jsonRes.cost,
        img: jsonRes.img,
        name: jsonRes.name,
      };
      console.log(productResolve);
      
      resolve(productResolve);
    } catch (error) {
      reject(new Error(error));
    }
  });
}
