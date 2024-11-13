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
        <div className="flex relative gap-1.5 text-xs font-semibold leading-4 text-gray-200">
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
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d14be8d3fdc114e28ae55fbc5dd8fce120d2c60430fbe22e5c0e0becbdbbfaf"
            className="object-contain shrink-0 aspect-[0.72] w-[13px]"
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
      </div>
    </div>
  );
}
