import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/components/navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface TaskData {
  id: string;
  case_id: string;
  description: string;
  due_date: string;
  is_complete: boolean;
  completed_at: string | null;
}

export default function TaskDetail() {
  const [taskData, setTaskData] = useState<TaskData[]>([]);
  const router = useRouter();
  const { caseId } = router.query; // Assuming caseId is passed in the URL query params

  const fetchTaskData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/task", {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      const data = await response.json();

      // Filter tasks by case_id if caseId is provided in the URL
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
  }, []);

  return (
    <div className="overflow-hidden pr-9 rounded-md bg-custom-dark-indigo max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col">
        <Navbar />
        <div className="flex pt-10 flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
          <div className="flex justify-between gap-10 items-center w-full font-semibold text-white max-md:max-w-full">
            <div className="my-auto text-2xl">Task Details</div>
            <button
              // onClick={handleCreateTask}
              className="flex gap-8 items-center px-4 py-3.5 text-sm rounded-lg bg-custom-light-indigo"
              //   onClick={handleAddCaseClick}
            >
              <div className="self-stretch my-auto">Create Task</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/abf0b717729f936f37d6e7bd3471cd624ff26eefb03ede9842209d5507e349cc?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
              />
            </button>
          </div>

          <TableContainer
            component={Paper}
            style={{ overflow: "auto" }}
            sx={{ backgroundColor: "#21222d" }}
          >
            <Table
              sx={{ minWidth: 650, backgroundColor: "#21222d" }}
              aria-label="task details table"
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
                    Case
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    Due Date
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    Completed
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", backgroundColor: "#21222d" }}
                  >
                    Completed At
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taskData.map((task, index) => (
                  <TableRow key={task.id} sx={{ backgroundColor: "#21222d" }}>
                    <TableCell sx={{ color: "white" }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      <Link
                        href={`/case`}
                        style={{
                          color: "#00BFFF",
                        }}
                      >
                        View Case
                      </Link>
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {task.description}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {new Date(task.due_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {task.is_complete ? "Yes" : "No"}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
