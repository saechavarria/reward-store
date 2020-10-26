import React, { useState, useEffect } from "react";
import { User } from "./services/interfaces";
import AppContext from "./AppContext";

import NavBar from "./components/NavBar";

import Body from "./components/Body";

import { getUser } from "./services/";

function App() {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    async function init() {
      try {
        const userService = await getUser();
        setUser(userService);
      } catch (error) {
        console.log("ERROR : " + error);
      }
    }
    init();
  }, []);

  return (
    <>
      <AppContext.Provider value={user}>
        <NavBar />
        <Body />
      </AppContext.Provider>
    </>
  );
}

export default App;
