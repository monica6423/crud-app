import React from "react";
import "./ParticipantTable.scss";
import { FiArrowDown } from "react-icons/fi";

const ParticipantTable = () => {
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
      <tbody></tbody>
    </table>
  );
};

export default ParticipantTable;
