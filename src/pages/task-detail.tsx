import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  FormControl,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface TaskData {
  id: string;
  case_id: string;
  description: string;
  due_date: string;
  is_complete: boolean;
  completed_at: string | null;
}

interface FormData {
  id?: string;
  case_id: string;
  description: string;
  due_date: string;
  is_complete: boolean;
}

const initialFormData: FormData = {
  case_id: '',
  description: '',
  due_date: '',
  is_complete: false,
};

export default function TaskDetail() {
  const [taskData, setTaskData] = useState<TaskData[]>([]);
  const router = useRouter();
  const { caseId } = router.query;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    taskId: string | null;
  }>({ isOpen: false, taskId: null });

  const fetchTaskData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/task", {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      const data = await response.json();

      const filteredData = caseId
        ? data.filter((task: TaskData) => task.case_id === caseId)
        : data;

      setTaskData(filteredData);
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [caseId]);

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};

    if (!formData.description?.trim()) {
      errors.description = "Description is required";
    }

    if (!formData.due_date) {
      errors.due_date = "Due date is required";
    }

    if (!formData.case_id?.trim()) {
      errors.case_id = "Case ID is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDeleteConfirmation = (taskId: string) => {
    setConfirmDelete({ 
      isOpen: true, 
      taskId: taskId 
    });
  };

  const handleDeleteTask = async () => {
    const taskId = confirmDelete.taskId;
    if (!taskId) return;
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      await fetchTaskData();
      setConfirmDelete({ isOpen: false, taskId: null });
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const handleEditTask = (task: TaskData) => {
    setFormData({
      id: task.id,
      case_id: task.case_id,
      description: task.description,
      due_date: new Date(task.due_date).toISOString().split('T')[0],
      is_complete: task.is_complete
    });
    
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '');
      const url = isEditMode 
        ? `${baseUrl}/task/${formData.id}` 
        : `${baseUrl}/task`;
      
      const method = isEditMode ? "PATCH" : "POST";

      const requestPayload = {
        ...formData,
        due_date: new Date(formData.due_date).toISOString(),
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      await fetchTaskData();
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
    setFormErrors({});
    setIsEditMode(false);
  };

  const handleAddTaskClick = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="overflow-hidden pr-9 rounded-md bg-custom-dark-indigo max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col">
        <Navbar />
        <div className="flex flex-col ml-60 w-[84%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch mb-auto mt-10 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex justify-between gap-10 items-center w-full font-semibold text-white max-md:max-w-full">
            <div className="my-auto text-2xl">Task Details</div>
            <button
              className="flex gap-8 items-center px-4 py-3.5 text-sm rounded-lg bg-custom-light-indigo"
              onClick={handleAddTaskClick}
            >
              <div className="self-stretch my-auto">Create Task</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/abf0b717729f936f37d6e7bd3471cd624ff26eefb03ede9842209d5507e349cc"
                className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                alt="Create task icon"
              />
            </button>
          </div>

          <div className="flex overflow-hidden flex-col mt-4 w-full rounded-lg bg-custom-light-indigo min-h-[777px] max-md:max-w-full">
            <div className="flex flex-wrap gap-4 items-center px-6 pt-5 pb-5 w-full max-md:px-5 max-md:max-w-full">
              <div className="flex flex-1 shrink self-stretch my-auto h-5 basis-0 min-w-[240px] w-[875px]" />
              <div className="flex gap-4 items-center self-stretch my-auto bg-custom-light-indigo">
                <div className="flex items-start self-stretch my-auto">
                </div>
              </div>
            </div>
            <TableContainer
              component={Paper}
              style={{ maxHeight: "400px", overflow: "auto" }}
              sx={{ backgroundColor: "#21222d" }}
            >
              <Table
                sx={{ minWidth: 650, backgroundColor: "#21222d" }}
                aria-label="task details table"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    {[
                      "#",
                      "Case",
                      "Description",
                      "Due Date",
                      "Completed",
                      "Completed At",
                      "Actions"
                    ].map((header) => (
                      <TableCell
                        key={header}
                        sx={{ color: "white", backgroundColor: "#21222d" }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {taskData.map((task, index) => (
                    <TableRow
                      key={task.id}
                      sx={{ backgroundColor: "#333443" }}
                    >
                      <TableCell sx={{ color: "white", backgroundColor: "#333443" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ color: "white", backgroundColor: "#333443" }}>
                        {task.case_id}
                      </TableCell>
                      <TableCell sx={{ color: "white", backgroundColor: "#333443" }}>
                        {task.description}
                      </TableCell>
                      <TableCell sx={{ color: "white", backgroundColor: "#333443" }}>
                        {new Date(task.due_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          timeZone: "UTC",
                        })}
                      </TableCell>
                      <TableCell sx={{ color: "white", backgroundColor: "#333443" }}>
                        {task.is_complete ? "Yes" : "No"}
                      </TableCell>
                      <TableCell sx={{ color: "white", backgroundColor: "#333443" }}>
                        {task.completed_at
                          ? new Date(task.completed_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                timeZone: "UTC",
                              }
                            )
                          : "N/A"}
                      </TableCell>
                      <TableCell sx={{ color: "white", backgroundColor: "#333443" }}>
                        <div className="flex gap-2">
                          <IconButton 
                            onClick={() => handleEditTask(task)}
                            sx={{ color: "white" }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            onClick={() => handleDeleteConfirmation(task.id)}
                            sx={{ color: "white" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          </div>
        </div>
      </div>

          {/* Modal Form */}
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <div className="flex justify-center items-center min-h-screen bg-opacity-60 bg-gray-900">
              <form
                onSubmit={handleFormSubmit}
                className="relative bg-custom-light-indigo text-white p-8 rounded-lg shadow-lg max-w-3xl w-full"
              >
                <IconButton
                  onClick={handleCloseModal}
                  className="absolute top-0 right-2 text-white hover:text-white"
                >
                  <CloseIcon />
                </IconButton>

                <div className="grid grid-cols-3 gap-4">
                  {/* Case ID */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">Case ID</label>
                    <TextField
                      name="case_id"
                      type="string"
                      value={formData.case_id}
                      onChange={handleInputChange}
                      error={!!formErrors.case_id}
                      helperText={formErrors.case_id}
                      className="bg-custom-lighter-indigo rounded-md"
                      InputProps={{ style: { color: "white" } }}
                    />
                  </FormControl>

                  {/* Description */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">Description</label>
                    <TextField
                      name="description"
                      type="string"
                      value={formData.description}
                      onChange={handleInputChange}
                      error={!!formErrors.description}
                      helperText={formErrors.description}
                      className="bg-custom-lighter-indigo rounded-md"
                      InputProps={{ style: { color: "white" } }}
                    />
                  </FormControl>

                  {/* Due Date */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">Due Date</label>
                    <TextField
                      name="due_date"
                      type="date"
                      value={formData.due_date}
                      onChange={handleInputChange}
                      error={!!formErrors.due_date}
                      helperText={formErrors.due_date}
                      className="bg-custom-lighter-indigo rounded-md"
                      InputProps={{ style: { color: "white" } }}
                    />
                  </FormControl>

                  {/* Completed Status */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">Completed</label>
                    <Select
                      name="is_complete"
                      value={formData.is_complete}
                      onChange={handleInputChange}
                      className="bg-custom-lighter-indigo rounded-md text-white"
                    >
                      <MenuItem value={true as any}>Yes</MenuItem>
                      <MenuItem value={false as any}>No</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-10">
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "#E4BE45",
                      width: "200px",
                      height: "50px",
                    }}
                    className="bg-yellow gap-8 text-white font-semibold rounded-lg"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </Modal>

          {/* Delete Confirmation Modal */}
          {/* Delete Confirmation Modal */}
          <Modal
            open={confirmDelete.isOpen}
            onClose={() => setConfirmDelete({ isOpen: false, taskId: null })}
            aria-labelledby="delete-confirmation-title"
          >
            <Box sx={{
              position: "absolute" as const,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "#21222d",
              borderRadius: "12px",
              boxShadow: 24,
              p: 4,
              color: "white",
              textAlign: "center"
            }}>
              <h2 id="delete-confirmation-title" className="text-xl mb-4">
                Confirm Delete
              </h2>
              <p className="mb-4">Are you sure you want to delete this task?</p>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={handleDeleteTask}
                >
                  Delete
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => setConfirmDelete({ isOpen: false, taskId: null })}
                  sx={{ color: "white", borderColor: "white" }}
                >
                  Cancel
                </Button>
              </div>
            </Box>
          </Modal>
    </div>
  );
}
