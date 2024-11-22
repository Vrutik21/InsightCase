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
import axios from "axios";
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
      const caseResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/case`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setTableData(caseResponse.data);

      // Fetch clients for dropdown
      const clientResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      setClients(clientResponse.data);

      // Fetch staff for dropdown
      const staffResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      setStaff(staffResponse.data);

      // Fetch services for dropdown
      const serviceResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/service`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      setServices(serviceResponse.data);
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
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/case`,
        {
          ...formData,
          case_manager_id: "2a697b79-62f1-4e1c-ab79-e0245619f85c",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

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
    <div className="overflow-hidden pr-9 rounded-md bg-custom-dark-indigo max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col">
        <Navbar />
        <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
          {/* Header */}
          <div className="flex justify-between gap-10 items-center w-full font-semibold text-white max-md:max-w-full mt-10">
            <div className="my-auto text-2xl">Case Details</div>
            <button
              onClick={handleAddCaseClick}
              className="flex items-center gap-8 px-4 py-3.5 text-sm rounded-lg bg-custom-light-indigo"
            >
              <div className="self-stretch my-auto">Add Case</div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/abf0b717729f936f37d6e7bd3471cd624ff26eefb03ede9842209d5507e349cc"
                className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                alt="Add Case"
              />
            </button>
          </div>

          {/* Table */}
          <div className="flex overflow-hidden flex-col mt-4 w-full rounded-lg bg-custom-light-indigo min-h-[777px] max-md:max-w-full">
            <div className="flex flex-wrap gap-4 items-center px-6 pt-5 pb-5 w-full max-md:px-5 max-md:max-w-full">
                  <div className="flex flex-1 shrink self-stretch my-auto h-5 basis-0 min-w-[240px] w-[875px]" />
                  <div className="flex gap-4 items-center self-stretch my-auto bg-custom-light-indigo">
                    <div className="flex items-start self-stretch my-auto">
                      <div className="flex items-start text-white rounded-lg">
                        <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-2.5 rounded-lg bg-custom-light-indigo">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5875b96783249afcdda6028fb0ac9c2a8b1b00d54a36c45d450498274e024d49?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                          />
                          <div className="self-stretch my-auto">Delete </div>
                        </div>
                      </div>
                      <div className="flex items-start text-white whitespace-nowrap rounded-lg">
                        <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-2.5 rounded-lg bg-custom-light-indigo">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9a3281f6ba912ddd2b10f18e5aeaab0b6670f9d9a34254e2506f9230e109cb4?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                          />
                          <div className="self-stretch my-auto">Filters</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            <TableContainer
              component={Paper}
              style={{ maxHeight: "400px", overflow: "auto" }}
              sx={{ backgroundColor: "#21222d" }}
            >
              <Table stickyHeader sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    {[
                      "#",
                      "Case Manager Name",
                      "Staff Name",
                      "Service Name",
                      "Client Name",
                      "Region",
                      "Status",
                      "Start Date",
                      "Number of Tasks",
                    ].map((header, index) => (
                      <TableCell
                        key={index}
                        sx={{ color: "white", backgroundColor: "#21222d" }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={row.id} sx={{ backgroundColor: "#333443" }}>
                      <TableCell sx={{ color: "white" }}>{index + 1}</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {row.case_manager?.name || "N/A"}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {row.staff?.name || "N/A"}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {row.service?.name || "N/A"}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {row.client?.name || "N/A"}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {row.region}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {row.status}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {new Date(row.start_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        <Link
                          href={`/task-detail`}
                          className="underline text-blue-400"
                        >
                          {row._count.tasks || 0} Tasks
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>

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
              className="absolute top-0 right-0 text-gray-400 hover:text-white"
            >
              <CloseIcon />
            </IconButton>

            <div className="grid grid-cols-2 gap-4">
              <FormControl fullWidth margin="normal">
                <InputLabel className="text-gray-300">Client Name</InputLabel>
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
                    ?.filter((item) => item.name != "test")
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
  );
}
