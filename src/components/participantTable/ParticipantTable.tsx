import React, { useContext, useState, useEffect } from "react";
import "./ParticipantTable.scss";
import { FiArrowDown } from "react-icons/fi";
import { GlobalContext } from "../../context/GlobalState";
import { Participant } from "../../interfaces/";
import ParticipantRow from "../participantRow/ParticipantRow";

const ParticipantTable = () => {
  const { participants } = useContext(GlobalContext) as {
    participants: Participant[];
  };
  console.log("participants", participants);
  const [participantArray, setParticipantArray] = useState<Participant[]>([]);

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
              <FiArrowDown />
            </div>
          </th>
          <th>
            <div>
              E-mail address
              <FiArrowDown />
            </div>
          </th>
          <th>
            <div>
              Phone number
              <FiArrowDown />
            </div>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {participantArray.map((participant: Participant, index: number) => {
          return <ParticipantRow participant={participant} />;
        })}
      </tbody>
    </table>
  );
};

export default ParticipantTable;
