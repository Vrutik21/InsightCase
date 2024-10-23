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

interface TableDataRow {
    id: string;
    name: string;
    initial_contact_days: number;
    intake_interview_days: number;
    action_plan_weeks: number;
    monthly_contact: boolean;
    monthly_reports: boolean;
}

export default function MyComponent() {
    const [tableData, setTableData] = useState<TableDataRow[]>([]);
    useEffect(() => {
        // Fetching data from the given site
        const fetchData = async () => {
            try {
              const response = await fetch('https://57c9-137-207-232-221.ngrok-free.app/service', {
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
                <Navbar />
                <div className="flex flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col self-stretch mb-auto mt-10 w-full max-md:mt-10 max-md:max-w-full">
                        {/* Flex container to align title and button */}
                        <div className="flex justify-between gap-10 items-center w-full font-semibold text-white max-md:max-w-full">
                            <div className="my-auto text-2xl">Services</div>
                            <div className="flex items-center gap-8 px-4 py-3.5 text-sm rounded-lg bg-custom-light-indigo">
                                <div className="self-stretch my-auto">Add Services</div>
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
                            <TableContainer component={Paper} style={{ maxHeight: '400px', overflow: 'auto' }} sx={{ backgroundColor: '#21222d' }}>
                                <Table sx={{ minWidth: 650, backgroundColor: '#21222d' }} aria-label="simple table" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Serial Number</TableCell>
                                            <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Service Name</TableCell>
                                            <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Initial Contact Days</TableCell>
                                            <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Intake Interview Days</TableCell>
                                            <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Action Plan Week</TableCell>
                                            <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Monthly Contact</TableCell>
                                            <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>Monthly Reports</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tableData.map((row, index) => (
                                            <TableRow key={index} sx={{ backgroundColor: '#21222d' }}>
                                                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{index + 1}</TableCell>
                                                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.name}</TableCell>
                                                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.initial_contact_days}</TableCell>
                                                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.intake_interview_days}</TableCell>
                                                <TableCell sx={{ color: 'white', backgroundColor: '#21222d' }}>{row.action_plan_weeks}</TableCell>
                                                <TableCell sx={{ backgroundColor: '#21222d' }}>
                {row.monthly_contact ? (
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3b3158219e3022473f4f8f75875bca041d9a8edb180a5dcbdba7d365a8eb6d5?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                        className="object-contain self-stretch my-auto aspect-[1.1] w-[22px]"
                    />
                ) : (
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c55bb597fadc109fac373049c4c384debc5f56895926bfa891f5c283f6b9835?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                        className="object-contain self-stretch my-auto w-5 aspect-square"
                    />
                )}
            </TableCell>
            <TableCell sx={{ backgroundColor: '#21222d' }}>
                {row.monthly_reports ? (
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3b3158219e3022473f4f8f75875bca041d9a8edb180a5dcbdba7d365a8eb6d5?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                        className="object-contain self-stretch my-auto aspect-[1.1] w-[22px]"
                    />
                ) : (
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c55bb597fadc109fac373049c4c384debc5f56895926bfa891f5c283f6b9835?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                        className="object-contain self-stretch my-auto w-5 aspect-square"
                    />
                )}
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
        </div>
    );
}
