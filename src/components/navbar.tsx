import * as React from "react";
import Link from 'next/link'
export default function Navbar() {
  return (
    <div className="flex overflow-hidden flex-col pb-28 rounded bg-zinc-800 max-w-[213px] shadow-[10px_11px_72px_rgba(0,0,0,0.24)]">
      <div className="flex relative flex-col items-start px-4 pt-12 pb-28 w-full aspect-[0.233]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab495bf556c8b1ffea4d39227151afc83d01bb797e621b8ee8251bba38dce1ef?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative gap-1.5 text-xs font-semibold leading-4 text-gray-200">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0edc8bfc8f1149baac2c31ce449116efa0a2d38935ca1554c9e6ec50223560e3?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0edc8bfc8f1149baac2c31ce449116efa0a2d38935ca1554c9e6ec50223560e3?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0edc8bfc8f1149baac2c31ce449116efa0a2d38935ca1554c9e6ec50223560e3?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0edc8bfc8f1149baac2c31ce449116efa0a2d38935ca1554c9e6ec50223560e3?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0edc8bfc8f1149baac2c31ce449116efa0a2d38935ca1554c9e6ec50223560e3?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0edc8bfc8f1149baac2c31ce449116efa0a2d38935ca1554c9e6ec50223560e3?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0edc8bfc8f1149baac2c31ce449116efa0a2d38935ca1554c9e6ec50223560e3?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0edc8bfc8f1149baac2c31ce449116efa0a2d38935ca1554c9e6ec50223560e3?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
            className="object-contain shrink-0 aspect-[1.77] w-[53px]"
          />
          <div>
            Insight <br />
            Advantage
          </div>
        </div>
        <div className="flex relative gap-2 mt-28 ml-7 text-base font-semibold text-amber-300 whitespace-nowrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d14be8d3fdc114e28ae55fbc5dd8fce120d2c60430fbe22e5c0e0becbdbbfaf?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
            className="object-contain shrink-0 aspect-[0.72] w-[13px]"
          />
          {/* <div className="my-auto">Task</div> */}
          <Link href="/dashboard">
          <button className="my-auto bg-transparent text-white border-none cursor-pointer">
            Task
            </button>
          </Link>
        </div>
        <div className="flex relative gap-1.5 mt-16 ml-7 text-base font-semibold whitespace-nowrap text-zinc-300">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/27259f0d190eabe812548ce32c6568b22cef8b293d9bee1a5f2831412d1c69ae?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
            className="object-contain shrink-0 aspect-[0.83] w-[15px]"
          />
          {/* <div className="my-auto">Case</div> */}
          <Link href="/case">
          <button className="my-auto bg-transparent text-white border-none cursor-pointer">
            Case
            </button>
          </Link>
        </div>
        <div className="flex relative gap-1.5 self-center mt-11 max-w-full w-[129px]">
          <div className="flex overflow-hidden relative flex-col aspect-square w-[15px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a7e29016775038e3c098c7fe6999f8a619208a0d39b39a22c9d1f8b6b6d69a6?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
              className="object-cover absolute inset-0 size-full"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a7e29016775038e3c098c7fe6999f8a619208a0d39b39a22c9d1f8b6b6d69a6?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
              className="object-contain w-full aspect-square"
            />
          </div>
          {/* <div className="grow shrink my-auto text-base font-semibold text-zinc-300 w-[105px]">
            Client Details
          </div> */}
          <Link href="/client">
          <button className="grow shrink my-auto text-base font-semibold text-zinc-300 w-[105px]">
            Client Details
            </button>
          </Link>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/026ff0ce6178839c06ee43ae4f8850214c24c1fb07725312719f6a47825f4681?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
          className="object-contain self-stretch mb-0 w-full aspect-[166.67] mt-[461px]"
        />
      </div>
    </div>
  );
}