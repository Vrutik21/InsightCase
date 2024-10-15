import Image from "next/image";

export default function Login() {
  return (
    <div className="flex flex-col items-start px-16 pt-16 pb-10 text-sm font-medium text-white bg-zinc-800 max-md:px-5 min-h-screen">
      {/* Logo Section */}
      <div className="flex gap-5 text-2xl font-semibold leading-9 text-gray-200 items-center">
        <Image
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4530146a7babe0dc1844a2da981060779e6ebf2a0e0efdebdb67e544177c109?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c&width=100"
          width={119}
          height={68} // Example height (adjust according to image ratio)
          alt="Insight Advantage Logo"
        />
        <div>
          Insight <br />
          Advantage
        </div>
      </div>

      {/* Login Section */}
      <div className="mt-16 text-3xl font-bold max-md:mt-10">
        Login into your account
      </div>

      {/* Email Field */}
      <label htmlFor="email" className="mt-12 text-lg max-md:mt-10">
        Email Address
      </label>
      <div className="flex gap-5 justify-between pl-3.5 mt-3.5 max-w-full bg-gray-100 rounded-lg text-zinc-600 w-[315px]">
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-grow bg-transparent border-none focus:outline-none"
        />
        <Image
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1499882c57ba758261764ef60b36de914309a0af75c9d0f7676ec47ad0ba9376?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
          width={50}
          height={50}
          alt="Email Icon"
        />
      </div>

      {/* Password Field */}
      <label htmlFor="password" className="mt-5 text-lg">
        Password
      </label>
      <div className="flex gap-5 justify-between pl-3.5 mt-3.5 max-w-full bg-gray-100 rounded-lg text-zinc-600 w-[315px]">
        <input
          type="password"
          placeholder="Enter your password"
          className="flex-grow bg-transparent border-none focus:outline-none"
        />
        <Image
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0615daa4035a71ba438ea9655c547139880964fbb94fd40dbfc88576f82f6346?placeholderIfAbsent=true&apiKey=877b457759d54d259ca44608a719ca2c"
          width={50}
          height={50}
          alt="Password Icon"
        />
      </div>

      {/* Forgot Password Link */}
      <div className="mt-5 text-amber-300 cursor-pointer">Forgot Password?</div>

      {/* Login Button */}
      <button className="w-full py-3 mt-6 text-base font-bold text-black bg-amber-300 rounded-lg shadow-lg max-w-[315px] hover:bg-amber-400 focus:ring-4 focus:ring-amber-500">
        Login Now
      </button>

      {/* Sign Up Link */}
      <div className="mt-5 text-base">
        Don’t have an account?
        <span className="font-bold text-amber-300 underline cursor-pointer">
          Create new
        </span>
      </div>
    </div>
  );
}
