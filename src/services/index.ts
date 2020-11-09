import { IUser } from "./interfaces";
import { IProducts } from "./interfaces";
import { IHistory } from "./interfaces";

export function getUser(): Promise<IUser> {
  return new Promise(async (resolve, reject) => {
    const endpoint = "https://coding-challenge-api.aerolab.co/user/me";

    const requestInit: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE4ODkwOGI5NTIzZTAwMjA3ZTFmYzAiLCJpYXQiOjE2MDQ4ODA2NDh9.Wtn96Dvpl8LhRWE9EsUW8gHYJvSMIRkCLuWsSpZLQ0c",
        },
    };
    try {
      const res = await fetch(endpoint, requestInit);
      const jsonRes = await res.json();

      const userResolve: IUser = {
        name: jsonRes.name,
        points: jsonRes.points,
      };
      resolve(userResolve);
    } catch (error) {
      reject(new Error(error));
    }
  });
}

export function getProduct(): Promise<IProducts[]> {
  return new Promise(async (resolve, reject) => {
    const endpoint = "https://coding-challenge-api.aerolab.co/products";
    const requestInit: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE4ODkwOGI5NTIzZTAwMjA3ZTFmYzAiLCJpYXQiOjE2MDQ4ODA2NDh9.Wtn96Dvpl8LhRWE9EsUW8gHYJvSMIRkCLuWsSpZLQ0c",
      },
    };
    try {
      const resProducto = await fetch(endpoint, requestInit);
      const jsonResProduct = await resProducto.json();

      const productResolve: IProducts[] = jsonResProduct.map(
        (prod: { _id: any; category: any; cost: any; img: any; name: any }) => {
          return {
            id: prod._id,
            category: prod.category,
            cost: prod.cost,
            img: prod.img,
            name: prod.name,
          };
        }
      );
      resolve(productResolve);
    } catch (error) {
      reject(new Error(error));
    }
  });
}

export function getHistory():Promise<IHistory[]> {
  const endpoint = "https://coding-challenge-api.aerolab.co/user/history";
  const requestInit: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE4ODkwOGI5NTIzZTAwMjA3ZTFmYzAiLCJpYXQiOjE2MDQ4ODA2NDh9.Wtn96Dvpl8LhRWE9EsUW8gHYJvSMIRkCLuWsSpZLQ0c",
    },
  };

  return new Promise(async (resolve, reject) => {
    try {
      const resHistory = await fetch(endpoint, requestInit);
      const jsonResHistory = await resHistory.json();

      const historyResolve: IHistory[] = jsonResHistory.map(
        (his: {
          productId: any;
          name: any;
          cost: any;
          category: any;
          _id: any;
          createDate: any;
        }) => {
          return {
            productId: his.productId,
            name: his.name,
            cost: his.cost,
            category: his.category,
            _id: his._id,
            createDate: his.createDate,
          };
        }
      );

      resolve(historyResolve);

    } catch (error) {
      reject(new Error(error));
    }
  });
}

export function redeemProduct(id: string) {
  const obj = { productId: id };
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: "application/json",
  });

  const endpoint = "https://coding-challenge-api.aerolab.co/redeem";

  const requestInit: RequestInit = {
    body: blob,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE4ODkwOGI5NTIzZTAwMjA3ZTFmYzAiLCJpYXQiOjE2MDQ4ODA2NDh9.Wtn96Dvpl8LhRWE9EsUW8gHYJvSMIRkCLuWsSpZLQ0c",
    },
  };

  return new Promise(async (resolve, reject) => {
    try {
      const resRedeem = await fetch(endpoint, requestInit);
      const jsonResRedeem = resRedeem.json();

      resolve(jsonResRedeem);
    } catch (error) {
      reject(new Error(error));
    }
  });
}

export function addPoints(points: number) {
  const obj = { amount: points };
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: "application/json",
  });

  const endpoint = "https://coding-challenge-api.aerolab.co/user/points";

  const requestInit: RequestInit = {
    body: blob,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE4ODkwOGI5NTIzZTAwMjA3ZTFmYzAiLCJpYXQiOjE2MDQ4ODA2NDh9.Wtn96Dvpl8LhRWE9EsUW8gHYJvSMIRkCLuWsSpZLQ0c",
    },
  };

  return new Promise(async (resolve, reject) => {
    try {
      const resPoints = await fetch(endpoint, requestInit);
      const jsonResPoints = resPoints.json();

      resolve(jsonResPoints);
    } catch (error) {
      reject(new Error(error));
    }
  });
}
