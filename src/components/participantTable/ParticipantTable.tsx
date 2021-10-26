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
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({ key: "", direction: "" });
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    setParticipantArray(participants);
  }, [participants]);

  const requestSort = async (key: string) => {
    if (rotate) {
      setRotate(false);
    } else {
      setRotate(true);
    }
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    const test = participantArray.sort((a: Participant, b: Participant) => {
      if (a[key].toUpperCase() < b[key].toUpperCase()) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key].toUpperCase() > b[key].toUpperCase()) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setParticipantArray([...test]);
  };

  const getClassNamesFor = (name: string) => {
    if (sortConfig) {
      return sortConfig.key === name ? sortConfig.direction : undefined;
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => requestSort("name")}>
            <div>
              Name
              <FiArrowDown className={`rotate ${getClassNamesFor("name")}`} />
            </div>
          </th>
          <th onClick={() => requestSort("email")}>
            <div>
              E-mail address
              <FiArrowDown className={`rotate ${getClassNamesFor("email")}`} />
            </div>
          </th>
          <th onClick={() => requestSort("phone")}>
            <div>
              Phone number
              <FiArrowDown className={`rotate ${getClassNamesFor("phone")}`} />
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
              setSortConfig={setSortConfig}
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
