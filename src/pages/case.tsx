import React, { useState, useEffect } from "react";
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
  InputLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
// import { TableDataRow } from "@/types"; // Import the type interface

interface TableDataRow {
  id: string;
  client_id: string;
  case_manager_id: string;
  staff_id: string;
  service_id: string;
  region: string;
  status: string;
  opened_at: string;
  start_at: string;
  closed_at: string;
  created_at: string;
  updated_at: string;
  case_manager: { name: string };
  staff: { name: string };
  service: { name: string };
  client: { first_name: string; last_name: string };
  _count: { tasks: number };
}

// Define enums for region and status
const REGIONS = [
  "WINDSOR",
  "LEAMINGTON",
  "HARROW",
  "AMHERSTBURG",
  "TILBURY",
  "CHATHAM",
];
const STATUSES = ["OPEN", "ONGOING", "CLOSED"];

export default function CaseTable() {
  const [tableData, setTableData] = useState<TableDataRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [services, setServices] = useState([]);

  // Form data state
  const [formData, setFormData] = useState({
    client_id: "",
    case_manager_id: "",
    staff_id: "",
    service_id: "",
    region: "",
    status: "",
    start_at: "",
  });

  const fetchData = async () => {
    try {
      // Fetch cases for the table
      const caseResponse = await fetch("http://localhost:3000/case");
      const caseData = await caseResponse.json();
      setTableData(caseData);

      // Fetch clients for dropdown
      const clientResponse = await fetch("http://localhost:3000/client");
      const clientData = await clientResponse.json();
      setClients(clientData);

      // Fetch staff for dropdown
      const staffResponse = await fetch("http://localhost:3000/user");
      const staffData = await staffResponse.json();
      setStaff(staffData);

      // Fetch services for dropdown
      const serviceResponse = await fetch("http://localhost:3000/service");
      const serviceData = await serviceResponse.json();
      setServices(serviceData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Open modal for adding a new case
  const handleAddCaseClick = () => {
    setIsModalOpen(true);
    fetchData();
  };
  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      client_id: "",
      case_manager_id: "",
      staff_id: "",
      service_id: "",
      region: "",
      status: "",
      start_at: "",
    });
  };

  // Fetch data for table and dropdowns
  useEffect(() => {
    fetchData();
  }, []);

  // Handle form input change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await fetch("http://localhost:3000/case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          case_manager_id: "2a697b79-62f1-4e1c-ab79-e0245619f85c",
        }),
      });

      console.log(formData, "formData");
      // After submission, close modal and refresh case table
      handleCloseModal();
      fetchData();
      setFormData({
        client_id: "",
        case_manager_id: "",
        staff_id: "",
        service_id: "",
        region: "",
        status: "",
        start_at: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="overflow-hidden  pr-9 rounded-md bg-custom-dark-indigo max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col">
        <Navbar />
        <div className="flex  pt-10 flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
          <div className="flex justify-between gap-10 items-center w-full font-semibold text-white max-md:max-w-full">
            <div className="my-auto text-2xl">Case Details</div>
            <button
              // onClick={handleCreateTask}
              className="flex gap-8 items-center px-4 py-3.5 text-sm rounded-lg bg-custom-light-indigo"
              onClick={handleAddCaseClick}
            >
              <div className="self-stretch my-auto">Create Case</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/abf0b717729f936f37d6e7bd3471cd624ff26eefb03ede9842209d5507e349cc?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
              />
            </button>
          </div>

          <TableContainer
            component={Paper}
            style={{ maxHeight: "400px", overflow: "auto" }}
            sx={{ backgroundColor: "#21222d" }}
          >
            <Table
              sx={{ minWidth: 650, backgroundColor: "#21222d" }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    #
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    Case Manager Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    Staff Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    Service Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    Client Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    Region
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    Start Date
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    Number of Tasks
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index} sx={{ backgroundColor: "#21222d" }}>
                    <TableCell sx={{ color: "white" }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {row.case_manager.name}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {row.staff.name}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {row.service.name}
                    </TableCell>
                    <TableCell
                      sx={{ color: "white" }}
                    >{`${row.client.first_name} ${row.client.last_name}`}</TableCell>
                    <TableCell sx={{ color: "white" }}>{row.region}</TableCell>
                    <TableCell sx={{ color: "white" }}>{row.status}</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {new Date(row.start_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      <Link href={`/task-detail`} className="underline">
                        {row._count.tasks} Tasks
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Modal for Add Case Form */}
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <div className="flex justify-center items-center min-h-screen bg-opacity-60 bg-gray-900">
              <form
                onSubmit={handleFormSubmit}
                className="relative bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full"
              >
                {/* Close button */}
                <IconButton
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <CloseIcon />
                </IconButton>

                <div className="grid grid-cols-2 gap-4">
                  <FormControl fullWidth margin="normal">
                    <InputLabel className="text-gray-300">
                      Client Name
                    </InputLabel>
                    <Select
                      name="client_id"
                      value={formData.client_id}
                      onChange={handleInputChange}
                      className="bg-gray-700 text-gray-300 rounded-md"
                    >
                      {clients.map((client) => (
                        <MenuItem key={client.id} value={client.id}>
                          {client.first_name} {client.last_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <InputLabel className="text-gray-300">Staff</InputLabel>
                    <Select
                      name="staff_id"
                      value={formData.staff_id}
                      onChange={handleInputChange}
                      className="bg-gray-700 text-gray-300 rounded-md"
                    >
                      {staff
                        .filter((item) => item.name != "test")
                        .map((staffMember) => (
                          <MenuItem key={staffMember.id} value={staffMember.id}>
                            {staffMember.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <InputLabel className="text-gray-300">Service</InputLabel>
                    <Select
                      name="service_id"
                      value={formData.service_id}
                      onChange={handleInputChange}
                      className="bg-gray-700 text-gray-300 rounded-md"
                    >
                      {services.map((service) => (
                        <MenuItem key={service.id} value={service.id}>
                          {service.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <InputLabel className="text-gray-300">Region</InputLabel>
                    <Select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="bg-gray-700 text-gray-300 rounded-md"
                    >
                      {REGIONS.map((region) => (
                        <MenuItem key={region} value={region}>
                          {region}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <InputLabel className="text-gray-300">Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="bg-gray-700 text-gray-300 rounded-md"
                    >
                      {STATUSES.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    margin="normal"
                    label="Start At"
                    type="date"
                    name="start_at"
                    value={formData.start_at}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                      className: "text-gray-300",
                    }}
                    InputProps={{
                      className: "bg-gray-700 text-gray-300 rounded-md",
                    }}
                  />
                </div>

                {/* Centered Save Button */}
                <div className="flex justify-center mt-6">
                  <Button
                    variant="contained"
                    type="submit"
                    className="bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-600"
                    style={{
                      width: "120px",
                    }}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
