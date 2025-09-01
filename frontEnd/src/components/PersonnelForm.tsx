import React, { useContext, useState, useEffect } from "react";
import { PersonnelContext } from "../context/PersonnelContext";
import { createPersonnel, updatePersonnel, getPersonnel } from "../api/personnelApi";

type Props = {
  editData: {
    id: number | null;
    fullName: string;
    registryNumber: string;
    email: string;
    department: string;
  };
  setEditData: React.Dispatch<
    React.SetStateAction<{
      id: number | null;
      fullName: string;
      registryNumber: string;
      email: string;
      department: string;
    }>
  >;
};

const PersonnelForm: React.FC<Props> = ({ editData, setEditData }) => {
  const { setPersonnel } = useContext(PersonnelContext);
  const [fullName, setFullName] = useState(editData.fullName);
  const [registryNumber, setRegistryNumber] = useState(editData.registryNumber);
  const [email, setEmail] = useState(editData.email);
  const [department, setDepartment] = useState(editData.department);

  const [fieldError, setFieldError] = useState("");

  useEffect(() => {
    setFullName(editData.fullName);
    setRegistryNumber(editData.registryNumber);
    setEmail(editData.email);
    setDepartment(editData.department);
  }, [editData]);

  const validateForm = () => {
    if (!fullName.trim()) return setFieldError("Full name is required."), false;
    if (!registryNumber.trim()) return setFieldError("Registry number is required."), false;
    if (!email.trim()) return setFieldError("Email is required."), false;
    if (!department.trim()) return setFieldError("Department is required."), false;
    setFieldError("");
    return true;
  };

  const resetForm = () => {
    setEditData({ id: null, fullName: "", registryNumber: "", email: "", department: "" });
    setFullName("");
    setRegistryNumber("");
    setEmail("");
    setDepartment("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { fullName, registryNumber, email, department };

    const action = editData.id
      ? updatePersonnel(editData.id, payload)
      : createPersonnel(payload);

    action
      .then(() => {
        // Başarılı olursa listeyi DB'den yeniden çek
        return getPersonnel();
      })
      .then(res => {
        setPersonnel(res.data);
        resetForm();
      })
      .catch(err => {
        console.error("SAVE failed:", err);
        alert(editData.id ? "Update failed." : "Create failed.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-field">
        <input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
        {fieldError === "Full name is required." && <p className="input-error">{fieldError}</p>}
      </div>
      <div className="form-field">
        <input placeholder="Registry Number" value={registryNumber} onChange={e => setRegistryNumber(e.target.value)} />
        {fieldError === "Registry number is required." && <p className="input-error">{fieldError}</p>}
      </div>
      <div className="form-field">
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        {fieldError === "Email is required." && <p className="input-error">{fieldError}</p>}
      </div>
      <div className="form-field">
        <input placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} />
        {fieldError === "Department is required." && <p className="input-error">{fieldError}</p>}
      </div>
      <button type="submit">{editData.id ? "Update" : "Add"}</button>
    </form>
  );
};

export default PersonnelForm;
