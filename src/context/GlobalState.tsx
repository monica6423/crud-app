import React, { createContext, useReducer, ReactElement } from "react";
import AppReducer from "./AppReducer";
import { Participant } from "../interfaces/";

interface InitialState {
  participants: Participant[] | [];
  addParticipant: (participant: Participant) => void;
}
interface GlobalProviderProps {
  children?: ReactElement[] | ReactElement;
}

// Initial state
const initialState: InitialState = {
  participants: [],
  addParticipant: () => {},
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const addParticipant = (participant: Participant) => {
    dispatch({
      type: "ADD_PARTICIPANT",
      payload: participant,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        participants: state.participants,
        addParticipant,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
