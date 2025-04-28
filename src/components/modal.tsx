import { Modal, Space, Input, DatePicker, Button } from "antd";
import { FC } from "react";

interface Props {
  open: boolean;
  loading: boolean;
  onCancel: () => void;
  onSave: () => void;
  username: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  birthDate: string;
  setBirthDate: (value: string) => void;
}

const EmployeeFormModal: FC<Props> = ({
  open,
  loading,
  onCancel,
  onSave,
  username,
  setUsername,
  email,
  setEmail,
  birthDate,
  setBirthDate,
}) => {
  return (
    <Modal className=""
      title={loading ? "Loading..." : "Create New Employee"}
      footer={
        <Button type="primary" onClick={onSave}>
          Add
        </Button>
      }
      open={open}
      onCancel={onCancel}
    >
      <Space direction="vertical" className="w-full gap-2">
        <Input
          placeholder="Create username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Create email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DatePicker
          onChange={(date, dateString) => setBirthDate(dateString)}
        />
      </Space>
    </Modal>
  );
};

export default EmployeeFormModal;
