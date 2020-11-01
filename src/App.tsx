import React, { useState, useEffect } from "react";
import { IUser } from "./services/interfaces";
import AppContext from "./AppContext";
import CircularProgress from "@material-ui/core/CircularProgress";

import NavBar from "./components/NavBar";

import Body from "./components/Body";

import { getUser } from "./services/";
import { ToastProvider } from "react-toast-notifications";
import "fontsource-roboto"

const App = () => {
  const [user, setUser] = useState<IUser>(null);

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
        <ToastProvider>
          <Body />
        </ToastProvider>
      </AppContext.Provider>
    </>
  );
};

export default App;
