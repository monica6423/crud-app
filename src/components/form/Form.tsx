import React, { useState, useContext, MouseEvent, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Form.scss";
import { GlobalContext } from "../../context/GlobalState";
import { Participant } from "../../interfaces/";

interface FormProps {
  participant?: Participant;
  edit: Boolean;
}

const Form = ({
  participant = { name: "", phone: "", email: "", id: "" },
  edit,
}: FormProps) => {
  const { addParticipant } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    name: participant.name,
    email: participant.email,
    phone: participant.phone,
    id: participant.id,
  });
  const [error, setError] = useState<{ [key: string]: string }>({});
  const { name, email, phone } = formData;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      id: participant.id || uuidv4(),
    });
    setError({ ...error, [e.target.name]: "" });
  };
  const validateMandatory = (formData: any) => {
    const errorObject: { [key: string]: string } = {};
    for (const item in formData) {
      if (!formData[item] || formData[item] === "") {
        errorObject[item] = "Mandatory";
      }
    }
    setError(errorObject);
    return Object.keys(errorObject).length > 0 ? false : true;
  };
  const onSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    if (validateMandatory(formData) === true) {
      addParticipant(formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        id: "",
      });
    }
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          placeholder="Full name"
        ></input>
        {error.name && (
          <div className="error-message">This is a required field.</div>
        )}
      </td>
      <td>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          placeholder="E-mail address"
        ></input>
        {error.email && (
          <div className="error-message">This is a required field.</div>
        )}
      </td>
      <td>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => onChange(e)}
          placeholder="Phone number"
        ></input>
        {error.phone && (
          <div className="error-message">This is a required field.</div>
        )}
      </td>
      <td className="button-cell">
        {edit ? (
          <>
            <button className="button cancel-button">Cancel</button>
            <button className="button save-button">Save</button>
          </>
        ) : (
          <button className="button" onClick={(e) => onSubmit(e)}>
            Add new
          </button>
        )}
      </td>
    </tr>
  );
};

export default Form;
