import * as React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  useEffect(() => {
    // Set active button based on the current path
    const currentPath = router.pathname;
    if (currentPath.includes("dashboard")) setActiveButton("task");
    else if (currentPath.includes("case")) setActiveButton("case");
    else if (currentPath.includes("client")) setActiveButton("client");
    else if (currentPath.includes("service")) setActiveButton("service");
  }, [router.pathname]);

  const handleButtonClick = (button: string, path: string) => {
    setActiveButton(button);
    router.push(path);
  };

  // Define rectangle styles dynamically based on the active button
  const getRectangleStyles = () => {
    let topValue = "174px"; // Default for "task"
    switch (activeButton) {
      case "task":
        topValue = "174px";
        break;
      case "case":
        topValue = "261px";
        break;
      case "client":
        topValue = "350px";
        break;
      case "service":
        topValue = "440px";
        break;
      default:
        break;
    }

    return {
      width: "210px",
      height: "60px",
      top: topValue,
      left: "24px",
      borderRadius: "47px",
      position: "absolute" as const,
      backgroundColor: "#21222d",
      color: "#DBDBDB",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px",
      transition: "top 0.3s ease, background-color 0.3s ease", // Smooth animation for top and color
    };
  };

  return (
    <div className="flex overflow-hidden flex-col pb-28 rounded bg-custom-light-indigo max-w-[213px] shadow-[10px_11px_72px_rgba(0,0,0,0.24)]">
      <div className="flex relative flex-col items-start px-4 pt-12 pb-28 w-full aspect-[0.233]">
        <div className="flex relative gap-1.5 text-sm font-semibold leading-4 text-gray-200 ml-2">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0edc8bfc8f1149baac2c31ce449116efa0a2d38935ca1554c9e6ec50223560e3"
            className="object-contain shrink-0 aspect-[1.77] w-[53px]"
          />
          <div>
            Insight <br />
            Advantage
          </div>
        </div>

        {/* Task Button */}
        <div
          className="flex relative gap-2.5 mt-28 ml-7 text-base font-semibold text-zinc-300 whitespace-nowrap"
          onClick={() => handleButtonClick("task", "/dashboard")}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8eb521e107e1aff25842d6dea993c2003f69da71885118e8c8aa1666e3145ee3?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
            className="object-contain shrink-0 aspect-[0.72] w-[13px] text-white"
          />
          <button className="my-auto bg-transparent text-white border-none cursor-pointer">
            Task
          </button>
        </div>

        {/* Case Button */}
        <div
          className="flex relative gap-2.5 mt-16 ml-7 text-base font-semibold whitespace-nowrap text-zinc-300"
          onClick={() => handleButtonClick("case", "/case")}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/27259f0d190eabe812548ce32c6568b22cef8b293d9bee1a5f2831412d1c69ae"
            className="object-contain shrink-0 aspect-[0.83] w-[15px]"
          />
          <button className="my-auto bg-transparent text-white border-none cursor-pointer">
            Case
          </button>
        </div>

        {/* Client Details Button */}
        <div
          className="flex relative gap-2.5 mt-16 ml-7 text-base font-semibold whitespace-nowrap text-zinc-300"
          onClick={() => handleButtonClick("client", "/client")}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cae3528aba236fb5a644a4d7a87a8e0989c5eddccedd74576a592331bdd7eca9"
            className="object-contain shrink-0 aspect-[0.83] w-[15px]"
          />
          <button className="my-auto bg-transparent text-white border-none cursor-pointer">
            Client
          </button>
        </div>

        {/* Service Button */}
        <div
          className="flex relative gap-2.5 mt-16 ml-7 text-base font-semibold whitespace-nowrap text-zinc-300"
          onClick={() => handleButtonClick("service", "/service")}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bd3325695840cd0c09ac5ce1c32fa6fe5eddbb2fde084b1ae1e1b60ac762291"
            className="object-contain shrink-0 aspect-[0.83] w-[15px]"
          />
          <button className="my-auto bg-transparent text-white border-none cursor-pointer">
            Service
          </button>
        </div>

        {/* Display the rectangle if a button is active */}
        {activeButton && (
          <div style={getRectangleStyles()}>
            <span className="text-amber-300">
              {activeButton.charAt(0).toUpperCase() + activeButton.slice(1)}
            </span>
          </div>
        )}


        {/* Bottom Image */}
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/026ff0ce6178839c06ee43ae4f8850214c24c1fb07725312719f6a47825f4681"
          className="object-contain self-stretch mb-0 w-full aspect-[166.67] mt-[461px]"
        />
        <div className="flex relative gap-2 mt-10">
              {/* <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
                className="object-contain shrink-0 aspect-square w-[34px]"
              /> */}
              <section class="flex gap-8 whitespace-nowrap max-w-[172px] text-zinc-100" aria-label="User Profile">
                <article class="flex gap-2">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3934cf0f8c790c39e2a80f4f4afe3fc522fccc146bc75ed3d8f5b01e7f4d3b9?placeholderIfAbsent=true&apiKey=70c5f0c08e304d4b9d8f08ceb2f4dd6f"
                    class="object-contain shrink-0 aspect-square w-[34px]"
                    alt=""
                  />
                  <div class="flex flex-col my-auto">
                    <h2 class="text-sm font-semibold font-medium">Hello there!</h2>
                    {/* <p class="self-start mt-2 text-xs">Admin</p> */}
                  </div>
                </article>
                <button 
                  class="my-auto"
                  aria-label="User menu"
                  tabindex="0"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a9a3499af352b3c3e90e3a0188b8f2c1279a97edc26febb3dd48dd0f455df8b?placeholderIfAbsent=true&apiKey=70c5f0c08e304d4b9d8f08ceb2f4dd6f"
                    class="object-contain shrink-0 aspect-square w-[15px]"
                    alt=""
                  />
                </button>
              </section>

            </div>
      </div>
    </div>
  );
}
