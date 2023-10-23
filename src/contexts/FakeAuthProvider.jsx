import { createContext } from "react";

const FakeAuthContext = createContext();

const FakeAuthProvider = ({ children }) => {
  const authInfo = {};

  return (
    <FakeAuthContext.Provider value={authInfo}>
      {children}
    </FakeAuthContext.Provider>
  );
};

export { FakeAuthProvider, FakeAuthContext };
