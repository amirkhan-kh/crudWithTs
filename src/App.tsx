"use client";
import { FC, useState, useEffect, useRef } from "react";
import { Button, Modal, Space, Card, Spin, Flex, Input } from "antd";

import { EmployeApi, deleteEmployee, updateEmploye } from "./db/data";
import { useEmployeeActions } from "./action";
import type { IEmployes } from "./types";

// Import our new components
import EmployeeFormModal from "./components/modal";
import EmployeeList from "./components/list";

const App: FC = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [employees, setEmployees] = useState<IEmployes[]>([]);
  const [auto, setAuto] = useState(false);
  console.log(setAuto);
  
  const [percent, setPercent] = useState(-50);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const { handleAddEmployee, loadingg } = useEmployeeActions();
  console.log(loadingg);
  
  // Create employee uchun
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // Update uchun
  const [editEmployee, setEditEmployee] = useState<IEmployes | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 80;
        return nextPercent > 1220 ? -50 : nextPercent;
      });
    }, 100);
    return () => clearTimeout(timerRef.current!);
  }, [percent]);

  const mergedPercent = auto ? "auto" : percent;

  const showCreateModal = () => {
    setOpenCreate(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const showUpdateModal = (employee: IEmployes) => {
    setEditEmployee(employee);
    setOpenUpdate(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      await deleteEmployee("employee", id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveUpdate = async () => {
    if (editEmployee) {
      try {
        const updated = await updateEmploye("employee", editEmployee.id || "", editEmployee);
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === editEmployee.id ? updated : emp))
        );
        setOpenUpdate(false);
        setEditEmployee(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await EmployeApi("employee");
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEmployees();
  }, []);

  return (
    <div className="container mx-auto">
      {/* Header */}
      <header className="border border-b-sky-400 flex justify-between px-10 py-2">
        <h1 className="text-blue-500 font-semibold text-[22px]">
          <strong>Todo</strong>
        </h1>
        <Button
          color="primary"
          variant="solid"
          onClick={showCreateModal}
        >
          Create Employee
        </Button>
      </header>

      {/* Create Modal */}
      <EmployeeFormModal
        open={openCreate}
        loading={loading}
        onCancel={() => setOpenCreate(false)}
        onSave={() =>
          handleAddEmployee(
            username,
            email,
            birthDate,
            setEmployees,
            setOpenCreate,
            setUsername,
            setEmail,
            setBirthDate
          )
        }
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
      />

      {/* Update Modal */}
      <Modal
        title={loading ? "Loading..." : "Update Employee"}
        footer={
          <Button type="primary" onClick={handleSaveUpdate}>
            Update
          </Button>
        }
        open={openUpdate}
        onCancel={() => {
          setOpenUpdate(false);
          setEditEmployee(null);
        }}
      >
        <Space direction="vertical" className="w-full gap-2">
          <Input
            placeholder="Username"
            value={editEmployee?.userName || ""}
            onChange={(e) =>
              setEditEmployee((prev) => ({ ...prev!, userName: e.target.value }))
            }
          />
          <Input
            placeholder="Email"
            value={editEmployee?.email || ""}
            onChange={(e) =>
              setEditEmployee((prev) => ({ ...prev!, email: e.target.value }))
            }
          />
          <Input
            placeholder="Created At"
            value={editEmployee?.createdAt || ""}
            onChange={(e) =>
              setEditEmployee((prev) => ({ ...prev!, createdAt: e.target.value }))
            }
          />
          <Input
            placeholder="Avatar URL"
            value={editEmployee?.avatar || ""}
            onChange={(e) =>
              setEditEmployee((prev) => ({ ...prev!, avatar: e.target.value }))
            }
          />
        </Space>
      </Modal>

      {/* Main */}
      <main className="flex flex-col items-center justify-center h-full p-5">
        <Space direction="vertical" className="w-full">
          <Card hoverable className="border-b-sky-400">
            {employees.length === 0 ? (
              <Flex
                align="center"
                gap="middle"
                className="flex justify-center"
              >
                <Spin percent={mergedPercent} size="large" />
              </Flex>
            ) : (
              <EmployeeList
                employees={employees}
                onUpdate={showUpdateModal}
                onDelete={handleDeleteEmployee}
              />
            )}
          </Card>
        </Space>
      </main>
    </div>
  );
};

export default App;
