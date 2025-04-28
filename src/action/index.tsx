import { useState } from "react";
import { addEmployee } from "../db/data"; // employeeApi dan import qilamiz

export function useEmployeeActions() {
  const [loadingg, setLoading] = useState(false);

  const handleAddEmployee = async (
    username: string,
    email: string,
    birthDate: string,
    setEmployees: React.Dispatch<React.SetStateAction<any[]>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setBirthDate: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const newEmployee = {
      userName: username,
      email: email,
      createdAt: birthDate,
      avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/29.jpg", 
    };

    try {
      setLoading(true);
      const addedEmployee = await addEmployee("employee", newEmployee);
      setEmployees((prev) => [...prev, addedEmployee]);
      setOpen(false);
      setUsername("");
      setEmail("");
      setBirthDate("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { handleAddEmployee, loadingg };
}
