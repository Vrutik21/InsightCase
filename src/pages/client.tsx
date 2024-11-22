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

interface TableDataRow {
  id: string;
  reference_number: number;
  referral_date: string;
  first_name: string;
  last_name: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  region: string;
  created_at: string;
  updated_at: string;
  _count: { cases: number };
}

interface FormData {
  reference_number: number | "";
  referral_date: string;
  first_name: string;
  last_name: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  region: string;
}

const REGIONS = [
  "WINDSOR",
  "LEAMINGTON",
  "HARROW",
  "AMHERSTBURG",
  "TILBURY",
  "CHATHAM",
];

const initialFormData: FormData = {
  reference_number: "",
  referral_date: "",
  first_name: "",
  last_name: "",
  dob: "",
  email: "",
  phone: "",
  address: "",
  region: "",
};

export default function CaseTable() {
  const [tableData, setTableData] = useState<TableDataRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/client",
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      // if (!response.ok) {
      //   throw new Error(HTTP error! status: ${response.status})
      // }

      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};

    if (!formData.first_name?.trim()) {
      errors.first_name = "First name is required";
    }

    if (!formData.last_name?.trim()) {
      errors.last_name = "Last name is required";
    }

    if (!formData.dob) {
      errors.dob = "Date of birth is required";
    }

    if (!formData.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Valid email is required";
    }

    if (!formData.phone?.match(/^\d+$/)) {
      errors.phone = "Phone must contain only numbers";
    }

    // if (!formData.reference_number) {
    //   errors.reference_number = "Reference number is required";
    // }

    if (!formData.region) {
      errors.region = "Region is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddClientClick = () => {
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
    setFormErrors({});
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/client",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            ...formData,
            reference_number: Number(formData.reference_number),
            phone: String(formData.phone),
            referral_date: new Date(formData.referral_date).toISOString(),
            dob: new Date(formData.dob).toISOString(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      await fetchData(); // Refresh table data
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="overflow-hidden pr-9 rounded-md bg-custom-dark-indigo max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col">
        <Navbar />
        <div className="flex pt-10 ml-60 flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
          {/* Header section */}
          <div className="flex justify-between gap-10 items-center w-full font-semibold text-white max-md:max-w-full">
            <div className="my-auto text-2xl">Client Details</div>
            <button
              className="flex gap-8 items-center px-4 py-3.5 text-sm rounded-lg bg-custom-light-indigo"
              onClick={handleAddClientClick}
            >
              <div className="self-stretch my-auto">Add client</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/abf0b717729f936f37d6e7bd3471cd624ff26eefb03ede9842209d5507e349cc"
                className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                alt="Add client icon"
              />
            </button>
          </div>

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
            {/* Table section */}
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
                    {[
                      "#",
                      "Reference ID",
                      "First Name",
                      "Last Name",
                      "Date of Birth",
                      "Email",
                      "Phone",
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
                  {tableData.map((row, index) => (
                    <TableRow
                      key={row.id || index}
                      sx={{ backgroundColor: "#333443" }}
                    >
                      <TableCell
                        sx={{ color: "white", backgroundColor: "#333443" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", backgroundColor: "#333443" }}
                      >
                        {row.reference_number}
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", backgroundColor: "#333443" }}
                      >
                        {row.first_name}
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", backgroundColor: "#333443" }}
                      >
                        {row.last_name}
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", backgroundColor: "#333443" }}
                      >
                        {new Date(row.dob).toLocaleDateString()}
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", backgroundColor: "#333443" }}
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", backgroundColor: "#333443" }}
                      >
                        {row.phone}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                  {/* Reference ID */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">
                      Reference ID
                    </label>
                    <TextField
                      name="reference_number"
                      type="number"
                      placeholder="Enter Reference ID"
                      value={formData.reference_number}
                      onChange={handleInputChange}
                      error={!!formErrors.reference_number}
                      helperText={formErrors.reference_number}
                      className="bg-custom-lighter-indigo rounded-md"
                      InputProps={{ style: { color: "white" } }}
                    />
                  </FormControl>

                  {/* Referral Date */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">
                      Referral Date
                    </label>
                    <TextField
                      name="referral_date"
                      type="date"
                      value={formData.referral_date}
                      onChange={handleInputChange}
                      error={!!formErrors.referral_date}
                      helperText={formErrors.referral_date}
                      className="bg-custom-lighter-indigo rounded-md"
                      InputProps={{ style: { color: "white" } }}
                    />
                  </FormControl>

                  {/* First Name */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">First Name</label>
                    <TextField
                      name="first_name"
                      type="string"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      error={!!formErrors.first_name}
                      helperText={formErrors.first_name}
                      className="bg-custom-lighter-indigo rounded-md"
                      InputProps={{ style: { color: "white" } }}
                    />
                  </FormControl>

                  {/* Last Name */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">Last Name</label>
                    <TextField
                      name="last_name"
                      type="string"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      error={!!formErrors.last_name}
                      helperText={formErrors.last_namee}
                      className="bg-custom-lighter-indigo rounded-md"
                      InputProps={{ style: { color: "white" } }}
                    />
                  </FormControl>

                  {/* Date of Birth */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">
                      Date of Birth
                    </label>
                    <TextField
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleInputChange}
                      error={!!formErrors.dob}
                      helperText={formErrors.dob}
                      className="bg-custom-lighter-indigo rounded-md"
                      InputProps={{ style: { color: "white" } }}
                    />
                  </FormControl>

                  {/* Email */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">Email</label>
                    <TextField
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                      className="bg-custom-lighter-indigo rounded-md"
                      InputProps={{ style: { color: "white" } }}
                    />
                  </FormControl>

                  {/* Phone */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">Phone</label>
                    <TextField
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={!!formErrors.phone}
                      helperText={formErrors.phone}
                      className="bg-custom-lighter-indigo rounded-md"
                      InputProps={{ style: { color: "white" } }}
                    />
                  </FormControl>

                  {/* Address */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">Address</label>
                    <TextField
                      name="address"
                      type="string"
                      value={formData.address}
                      onChange={handleInputChange}
                      error={!!formErrors.address}
                      helperText={formErrors.address}
                      className="bg-custom-lighter-indigo rounded-md"
                      InputProps={{ style: { color: "white" } }}
                    />
                  </FormControl>

                  {/* Add other form fields similarly */}
                  {/* ... */}

                  {/* Region */}
                  <FormControl fullWidth>
                    <label className="block text-white mb-1">Region</label>
                    <Select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      error={!!formErrors.region}
                      className="bg-custom-lighter-indigo rounded-md text-white"
                    >
                      {REGIONS.map((region) => (
                        <MenuItem key={region} value={region}>
                          {region}
                        </MenuItem>
                      ))}
                    </Select>
                    {formErrors.region && (
                      <div className="text-red-500 text-sm mt-1">
                        {formErrors.region}
                      </div>
                    )}
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
        </div>
      </div>
    </div>
  );
}
