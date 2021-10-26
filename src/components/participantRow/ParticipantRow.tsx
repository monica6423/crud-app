import React, { useContext, SetStateAction, Dispatch } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { Participant } from "../../interfaces/";
import "./ParticipantRow.scss";
import { GlobalContext } from "../../context/GlobalState";

interface ParticipantRowProps {
  participant?: Participant;
  setEditMode?: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  editMode?: { [key: string]: boolean };
}
const ParticipantRow = ({
  participant = { name: "", phone: "", email: "", id: "" },
  setEditMode,
  editMode,
}: ParticipantRowProps) => {
  const { deleteParticipant } = useContext(GlobalContext) as {
    participants: Participant[];
    deleteParticipant: (id: string) => void;
  };
  return (
    <tr className="list" key={participant.id}>
      <td>
        <div>{participant.name}</div>
      </td>
      <td>
        <div>{participant.email}</div>
      </td>
      <td>
        <div>{participant.phone}</div>
      </td>
      <td>
        <div className="edit-button-group">
          <button
            onClick={() =>
              setEditMode &&
              setEditMode({ ...editMode, [participant.id]: true })
            }
            className="edit-button"
          >
            <FaPen className="icon" />
          </button>
          <button className="edit-button">
            <FaTrash
              className="icon"
              onClick={() => deleteParticipant(participant.id)}
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ParticipantRow;
