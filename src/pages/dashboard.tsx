import React, {useState} from "react";
// import { Calendar } from "@/components/ui/calendar";
import Calendar from  '../components/cal';
import Navbar from "@/components/navbar";
import Link from 'next/link';
const name = "";



export default function Dashboard() {
    // const [showNavbar, setShowNavbar] = useState(false);
    // const navigate= useNavigate();
    // const handleCreateTask=()=>{
    //     // setShowNavbar((prevShowNavbar) => !prevShowNavbar);
    //     navigate('/createtask')
    // }
  return (
    <div className="overflow-hidden pr-9 rounded-md bg-custom-dark-indigo max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[14%] max-md:ml-0 max-md:w-full">
          <div className="flex overflow-hidden relative flex-col gap-5 justify-between items-start px-0 pb-10 w-full whitespace-nowrap rounded">
            <Navbar/>
            {/* <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbb9db940bc2c1cd6d17de807b634017bb83046642e4b70f8425e50eef3528?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbb9db940bc2c1cd6d17de807b634017bb83046642e4b70f8425e50eef3528?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbb9db940bc2c1cd6d17de807b634017bb83046642e4b70f8425e50eef3528?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbb9db940bc2c1cd6d17de807b634017bb83046642e4b70f8425e50eef3528?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbb9db940bc2c1cd6d17de807b634017bb83046642e4b70f8425e50eef3528?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbb9db940bc2c1cd6d17de807b634017bb83046642e4b70f8425e50eef3528?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbb9db940bc2c1cd6d17de807b634017bb83046642e4b70f8425e50eef3528?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbb9db940bc2c1cd6d17de807b634017bb83046642e4b70f8425e50eef3528?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
              className="object-cover absolute inset-0 size-full"
            /> */}
            <div className="flex relative gap-2">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                className="object-contain shrink-0 aspect-square w-[34px]"
              />
              <div className="flex flex-col my-auto">
                <div className="text-xs font-medium">Hannah</div>
                <div className="self-start mt-2 text-xs">Admin</div>
              </div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a9a3499af352b3c3e90e3a0188b8f2c1279a97edc26febb3dd48dd0f455df8b?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
              className="object-contain shrink-0 mt-2.5 aspect-square w-[15px]"
            />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-9 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-wrap gap-5 justify-between w-full font-semibold text-white max-md:max-w-full">
              <div className="my-auto text-2xl">Task</div>
              {/* <div className="flex gap-8 items-center px-4 py-3.5 text-sm rounded-lg bg-custom-light-indigo">
                <div className="self-stretch my-auto">Create Task</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/abf0b717729f936f37d6e7bd3471cd624ff26eefb03ede9842209d5507e349cc?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                  className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                />
              </div> */}
              <Link href="/createtask" passHref>
                <button
                    // onClick={handleCreateTask}
                    className="flex gap-8 items-center px-4 py-3.5 text-sm rounded-lg bg-custom-light-indigo"
                    >
                    <div className="self-stretch my-auto">Create Task</div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/abf0b717729f936f37d6e7bd3471cd624ff26eefb03ede9842209d5507e349cc?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                        className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                    />
                    </button>
                </Link>
                {/* {showNavbar && <Createtask />} */}
            </div>
            <div className="mt-9 w-full max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
                  <div className="grow pr-1.5 pl-8 w-full rounded-2xl bg-custom-light-indigo max-md:pl-5 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-0 max-md:flex-col">
                      <div className="flex flex-col ml-0 w-[50%] max-md:ml-0 max-md:w-full">
                        <div className="flex z-10 flex-col self-stretch my-auto max-md:mt-10">
                          <div className="text-3xl font-medium text-white">
                            Hello Hannah!
                          </div>
                          <div className="text-base text-amber-300 max-md:mr-2.5">
                            It’s good to see you again.
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col m-0 p-0 w-2/5 max-md:ml-0 max-md:w-full">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae308c4ed73174abd5d84c8d9084b1a29d42e0bc886e9f972a741ceed420e619?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                          className="object-contain self-stretch my-auto w-full aspect-[1.35] max-md:mt-5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
                  <div className="flex overflow-hidden flex-col pt-7 w-full rounded-2xl bg-custom-light-indigo max-md:mt-10">
                    <div className="flex flex-col px-6 max-md:px-5">
                      <div className="self-start text-3xl font-semibold leading-none text-white">
                        03
                      </div>
                      <div className="mt-2.5 text-lg leading-none text-stone-300">
                        Upcoming Task
                      </div>
                    </div>
                    <div className="flex shrink-0 mt-16 bg-amber-300 rounded-none h-[5px] w-[159px] max-md:mt-10" />
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
                  <div className="flex overflow-hidden flex-col pt-7 w-full rounded-2xl bg-custom-light-indigo max-md:mt-10">
                    <div className="flex flex-col items-start px-6 max-md:px-5">
                      <div className="text-3xl font-semibold leading-none text-white">
                        07
                      </div>
                      <div className="mt-2.5 text-lg leading-none text-stone-300">
                        Total Task
                      </div>
                    </div>
                    <div className="flex shrink-0 mt-16 bg-amber-300 rounded-none h-[5px] w-[159px] max-md:mt-10" />
                  </div>
                </div>
              </div>
            </div>

            {/* calendar class */}
            <Calendar
            />
          </div>
        </div>
      </div>
    </div>
  );
}