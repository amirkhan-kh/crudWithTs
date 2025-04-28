// components/EmployeeList.tsx
import { FC } from "react";
import { Button, Image } from "antd";
import type { IEmployes } from "../types";

interface Props {
  employees: IEmployes[];
  onUpdate: (employee: IEmployes) => void;
  onDelete: (id: string) => void;
}

const EmployeeList: FC<Props> = ({ employees, onUpdate, onDelete }) => {
  return (
    <table className="w-full flex flex-col">
      <thead>
        <tr className="bg-gray-100 text-left flex items-center justify-between p-2">
          <th>ID</th>
          <th>Avatar</th>
          <th>Username</th>
          <th>Email</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

      {employees.map((item) => (
        <tr
          key={item.id}
          className="flex justify-between items-center w-full my-2 border-b"
        >
          <td>{item.id}</td>
          <Image src={item.avatar} alt={item.userName} width={50} />
          <td className="ms-0">{item.userName}</td>
          <td>{item.email}</td>
          <td>{item.createdAt}</td>
          <td className="flex gap-2">
            <Button
              color="cyan"
              variant="outlined"
              onClick={() => onUpdate(item)}
            >
              Update
            </Button>

            <Button
              color="danger"
              variant="outlined"
              onClick={() => onDelete(item.id!)}
            >
              Delete
            </Button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
