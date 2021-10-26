import React, { useContext, useState, useEffect } from "react";
import "./ParticipantTable.scss";
import { FiArrowDown } from "react-icons/fi";
import { GlobalContext } from "../../context/GlobalState";
import { Participant } from "../../interfaces/";
import ParticipantRow from "../participantRow/ParticipantRow";
import Form from "../form/Form";

const ParticipantTable = () => {
  const { participants } = useContext(GlobalContext) as {
    participants: Participant[];
  };
  const [participantArray, setParticipantArray] = useState<Participant[]>([]);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setParticipantArray(participants);
  }, [participants]);

  return (
    <table>
      <thead>
        <tr>
          <th>
            <div>
              Name
              <FiArrowDown className="rotate" />
            </div>
          </th>
          <th>
            <div>
              E-mail address
              <FiArrowDown className="rotate" />
            </div>
          </th>
          <th>
            <div>
              Phone number
              <FiArrowDown className="rotate" />
            </div>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {participantArray.map((participant: Participant, index: number) => {
          return editMode[participant.id] === true ? (
            <Form
              key={participant.id}
              participant={participant}
              edit={true}
              setEditMode={setEditMode}
              editMode={editMode}
            />
          ) : (
            <ParticipantRow
              setEditMode={setEditMode}
              editMode={editMode}
              participant={participant}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default ParticipantTable;
