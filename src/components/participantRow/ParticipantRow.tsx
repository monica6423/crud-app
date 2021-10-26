import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { Participant } from "../../interfaces/";
import "./ParticipantRow.scss";

interface ParticipantRowProps {
  participant?: Participant;
}
const ParticipantRow = ({
  participant = { name: "", phone: "", email: "", id: "" },
}: ParticipantRowProps) => {
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
          <button className="edit-button">
            <FaPen className="icon" />
          </button>
          <button className="edit-button">
            <FaTrash className="icon" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ParticipantRow;
