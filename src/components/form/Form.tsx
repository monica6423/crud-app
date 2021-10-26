import React, {
  useState,
  useContext,
  MouseEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";
import "./Form.scss";
import { GlobalContext } from "../../context/GlobalState";
import { Participant } from "../../interfaces/";
import { FieldConfig } from "../fieldConfig/FieldConfig";

interface FormProps {
  participant?: Participant;
  edit: Boolean;
  setEditMode?: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  editMode?: { [key: string]: boolean };
  setSortConfig?: Dispatch<SetStateAction<{ key: string; direction: string }>>;
}

const Form = ({
  participant = { name: "", phone: "", email: "", id: "" },
  edit,
  setEditMode,
  editMode,
  setSortConfig,
}: FormProps) => {
  const { addParticipant, editParticipant } = useContext(GlobalContext);
  const [formData, setFormData] = useState<Participant>({
    name: participant.name,
    email: participant.email,
    phone: participant.phone,
    id: participant.id,
  });
  const [error, setError] = useState<{ [key: string]: string }>({});
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

  const onSave = async (e: MouseEvent, formData: Participant) => {
    e.preventDefault();
    await editParticipant(formData);
    setSortConfig && setSortConfig({ key: "", direction: "" });
    setEditMode && setEditMode({ ...editMode, [formData.id]: false });
  };

  const onCancel = (e: MouseEvent) => {
    e.preventDefault();
    setEditMode && setEditMode({ ...editMode, [formData.id]: false });
  };

  return (
    <tr>
      {Object.keys(FieldConfig).map((key) => {
        return (
          <td>
            <input
              type="text"
              id={FieldConfig[key].key}
              name={FieldConfig[key].key}
              value={formData[key]}
              onChange={(e) => onChange(e)}
              placeholder={FieldConfig[key].label}
            ></input>
            {error[key] && (
              <div className="error-message">This is a required field.</div>
            )}
          </td>
        );
      })}
      <td className="button-cell">
        {edit ? (
          <>
            <button
              className="button cancel-button"
              onClick={(e) => onCancel(e)}
            >
              Cancel
            </button>
            <button
              className="button save-button"
              onClick={(e) => onSave(e, formData)}
            >
              Save
            </button>
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
