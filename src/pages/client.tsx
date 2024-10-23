import * as React from "react";
import Navbar from "@/components/navbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

// Define the shape of your data
interface TableDataRow {
    id: string;
    reference_number: string;
    first_name: string;
    last_name: string;
    dob: string;
    email: string;
    phone: string;
    address: string;
    region: string;
    created_at: string;
    updated_at: string;
    _count: {cases: number};
  }

export default function MyComponent() {
    const [tableData, setTableData] = useState<TableDataRow[]>([]);
    useEffect(() => {
        // Fetching data from the given site
        const fetchData = async () => {
            try {
              const response = await fetch('https://57c9-137-207-232-221.ngrok-free.app/client', {
                headers: {
                  'ngrok-skip-browser-warning': 'true' // Add this header
                }
              }); // URL might need correction
              const data: TableDataRow[] = await response.json(); // Use the correct type here
              console.log(data);
              setTableData(data); // Storing data in state variable
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
      }, []);
  return (
    <div className="overflow-hidden pr-9 rounded-md bg-custom-dark-indigo max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col">
        <Navbar/>
        {/* <div className="flex flex-col w-[16%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6bed432aa024ff7f21ee2c96651d61b6d62860dd08c42ed6e16639aaf65c811c?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bed432aa024ff7f21ee2c96651d61b6d62860dd08c42ed6e16639aaf65c811c?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bed432aa024ff7f21ee2c96651d61b6d62860dd08c42ed6e16639aaf65c811c?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bed432aa024ff7f21ee2c96651d61b6d62860dd08c42ed6e16639aaf65c811c?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bed432aa024ff7f21ee2c96651d61b6d62860dd08c42ed6e16639aaf65c811c?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bed432aa024ff7f21ee2c96651d61b6d62860dd08c42ed6e16639aaf65c811c?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bed432aa024ff7f21ee2c96651d61b6d62860dd08c42ed6e16639aaf65c811c?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bed432aa024ff7f21ee2c96651d61b6d62860dd08c42ed6e16639aaf65c811c?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
            className="object-contain grow shrink-0 max-w-full rounded aspect-[0.23] shadow-[10px_11px_72px_rgba(0,0,0,0.24)] w-[213px] max-md:mt-10"
          />
        </div> */}
        <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch mb-auto mt-10 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex justify-between gap-10 items-center w-full font-semibold text-white max-md:max-w-full">
              <div className="my-auto text-2xl">Client Details</div>
              <div className="flex items-center gap-8 px-4 py-3.5 text-sm rounded-lg bg-custom-light-indigo">
                <div className="self-stretch my-auto">Add Clients</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/abf0b717729f936f37d6e7bd3471cd624ff26eefb03ede9842209d5507e349cc?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                  className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                />
              </div>
            </div>
            <div className="flex overflow-hidden flex-col mt-4 w-full rounded-lg bg-custom-light-indigo min-h-[777px] max-md:max-w-full">
              <div className="flex flex-col justify-center w-full text-sm font-medium leading-none bg-custom-light-indigo max-md:max-w-full">
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
              </div>
              {/* <Navbar/> */}

              <TableContainer component={Paper} style={{ maxHeight: '400px', overflow: 'auto' }} sx={{ backgroundColor: '#21222d' }}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
            <TableRow>
                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Clientid</TableCell>
                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Referenceid</TableCell>
                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Firstname</TableCell>
                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Lastname</TableCell>
                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Dob</TableCell>
                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Email</TableCell>
                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Phone</TableCell>
                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Address</TableCell>
                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Region</TableCell>
                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Created At</TableCell>
                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Updated At</TableCell>
                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Number of Cases</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {tableData.map((row, index) => (
                <TableRow key={index} sx={{ backgroundColor: '#21222d' }}>
                    <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.id}</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.reference_number}</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.first_name}</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.last_name}</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.dob}</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.email}</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.phone}</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.address}</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.region}</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.created_at}</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.updated_at}</TableCell>
                    <TableCell>{row._count.cases}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>


              {/* <div className="flex flex-col justify-center items-end px-3 py-2 w-full border-b border-slate-400 max-md:max-w-full">
                <div className="flex max-w-full bg-gray-400 rounded-xl min-h-[3px] w-[769px]" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}