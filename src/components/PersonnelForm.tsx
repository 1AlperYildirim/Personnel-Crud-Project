import React, { useContext, useState, useEffect } from "react";
import { PersonnelContext } from "../context/PersonnelContext";
import { createPersonnel, updatePersonnel } from "../api/personnelApi";

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
    if (!fullName.trim()) {
      setFieldError("Full name is required.");
      return false;
    }
    if (!registryNumber.trim()) {
      setFieldError("Registry number is required.");
      return false;
    }
    if (!email.trim()) {
      setFieldError("Email is required.");
      return false;
    }
    if (!department.trim()) {
      setFieldError("Department is required.");
      return false;
    }
    setFieldError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editData.id) {
      updatePersonnel(editData.id, { fullName, registryNumber, email, department })
        .then(res => {
          setPersonnel(prev => prev.map(p => (p.id === editData.id ? res.data : p)));
          setEditData({ id: null, fullName: "", registryNumber: "", email: "", department: "" });
        })
        .catch(() => {
          setPersonnel(prev =>
            prev.map(p =>
              p.id === editData.id ? { id: editData.id!, fullName, registryNumber, email, department } : p
            )
          );
          setEditData({ id: null, fullName: "", registryNumber: "", email: "", department: "" });
        });
    } else {
      createPersonnel({ fullName, registryNumber, email, department })
        .then(res => {
          setPersonnel(prev => [...prev, res.data]);
          setFullName("");
          setRegistryNumber("");
          setEmail("");
          setDepartment("");
        })
        .catch(() => {
          setPersonnel(prev => [
            ...prev,
            { id: Date.now(), fullName, registryNumber, email, department }
          ]);
          setFullName("");
          setRegistryNumber("");
          setEmail("");
          setDepartment("");
        });
    }
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
