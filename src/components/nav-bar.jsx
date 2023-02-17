import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";
import { ConnectKitButton } from 'connectkit'

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { pathname } = useRouter();

  return (
    <>
      <nav className="fixed z-10 w-full mx-auto border-gray-200 px-2 sm:px-4 py-2.5 rounded drop-shadow-lg bg-[#161515] md:bg-transparent">
        <div className="max-w-[1080px] container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center flex-1">
            <span className="flex flex-row items-center self-center text-xl font-semibold whitespace-nowrap text-[#E3FED8] hover:text-[#9FE598]">
              <Image src="/fitquest.png" width="50" height="50" alt="FitQuest" />
              FitQuest
            </span>
          </Link>
          <div className="flex md:order-2" style={{ marginLeft: "2rem" }}>
            <ConnectKitButton/>
            <button
              data-collapse-toggle="mobile-menu-4"
              type="button"
              className="ml-2 md:ml-0 inline-flex items-center py-2 px-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <span className="sr-only">Open main menu</span>
              <AiOutlineMenu size="20" />
            </button>
          </div>
          <div
            className={`${
              isOpenMenu ? "block" : "hidden"
            } justify-between items-center w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li></li>
              <li>
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "text-[#35B226]" : "text-[#E3FED8]"
                  } block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#9FE598] md:p-0`}
                  aria-current="page"
                >
                  <b>Home</b>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className={`${
                    pathname === "/dashboard"
                      ? "text-[#35B226]"
                      : "text-[#E3FED8]"
                  } block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#9FE598] md:p-0`}
                  aria-current="page"
                >
                  <b>Dashboard</b>
                </Link>
              </li>
              <li>
                <Link
                  href="/plans"
                  className={`${
                    pathname === "/plans"
                      ? "text-[#35B226]"
                      : "text-[#E3FED8]"
                  } block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#9FE598] md:p-0`}
                  aria-current="page"
                >
                  <b>Plans</b>
                </Link>
              </li>
              <li>
                <Link
                  href="/fitness"
                  className={`${
                    pathname === "/fitness"
                      ? "text-[#35B226]"
                      : "text-[#E3FED8]"
                  } block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#9FE598] md:p-0`}
                  aria-current="page"
                >
                  <b>Fitness</b>
                </Link>
              </li>
              <li>
                <Link
                  href="/wellness"
                  className={`${
                    pathname === "/wellness"
                      ? "text-[#35B226]"
                      : "text-[#E3FED8]"
                  } block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#9FE598] md:p-0`}
                  aria-current="page"
                >
                  <b>Wellness</b>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex pt-[30px]">
          <marquee className="text-[#E3FED8]" behavior="scroll" direction="left" width="100%">00100 11001001010 1110101000101 00100 11001001010 1110101000101 00100 11001001010 1110101000101 00100 11001001010 1110101000101 00100 11001001010 1110101000101 00100 11001001010 1110101000101 00100 11001001010 1110101000101 00100 11001001010 1110101000101</marquee>
        </div>
      </nav>
    </>
  );
};

export default Header;
