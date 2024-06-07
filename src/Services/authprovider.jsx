import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [participants, setParticipants] = useState(null);
  const [localParticipant, setLocalParticipant] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isAuthenticated,
        setAuthenticated,
        participants,
        setParticipants,
        localParticipant,
        setLocalParticipant,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
