import React, {
  createContext,
  useReducer,
  ReactElement,
  useEffect,
} from "react";
import AppReducer from "./AppReducer";
import { Participant } from "../interfaces/";
import { v4 as uuidv4 } from "uuid";

interface InitialState {
  participants: Participant[] | [];
  addParticipant: (participant: Participant) => void;
  deleteParticipant: (id: string) => void;
  editParticipant: (participant: Participant) => void;
}
interface GlobalProviderProps {
  children?: ReactElement[] | ReactElement;
}

// Initial state
const initialState: InitialState = {
  participants: [],
  addParticipant: () => {},
  deleteParticipant: () => {},
  editParticipant: () => {},
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    fetchParticipants();
  }, []);

  // Actions
  const fetchParticipants = async () => {
    const res = await fetch("https://randomuser.me/api/?results=20&nat=fi");
    const data = await res.json();

    const participants = data.results.map((result: any) => ({
      id: uuidv4(),
      name: `${result.name.first} ${result.name.last}`,
      email: result.email,
      phone: result.phone,
    }));

    dispatch({
      type: "FETCH_PARTICIPANTS",
      payload: participants,
    });
  };

  const addParticipant = (participant: Participant) => {
    dispatch({
      type: "ADD_PARTICIPANT",
      payload: participant,
    });
  };

  const deleteParticipant = (id: string) => {
    dispatch({
      type: "DELETE_PARTICIPANT",
      payload: id,
    });
  };

  const editParticipant = (participant: Participant) => {
    dispatch({
      type: "EDIT_PARTICIPANT",
      payload: participant,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        participants: state.participants,
        addParticipant,
        deleteParticipant,
        editParticipant,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
