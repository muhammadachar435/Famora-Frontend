// import React/NextJS Libraries
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

// Import Icon & Data
import { ChevronDown } from "lucide-react";
import { sidebarData } from "../../data/Sidebardata";

//  component of Sidebar
function Sidebar({ sidebar, setSidebar }) {
  const pathName = usePathname(); // to access the pathname
  const [dropDown, setDropDown] = useState(false); // dropDown State

  // sidebar open & close
  function handleSidebar() {
    {
      sidebarData.map((Data) => {
        if (Data.pathName === pathName) {
          setSidebar(false);
        } else {
          setSidebar(true);
        }
      });
    }
  }

  // UI Design
  return (
    <div className="mt-30">
      {sidebarData.map((data) => {
        const Icon = data.icon; // Icon Store
        return (
          <ul key={data.id}>
            <li
              className={` ${
                pathName === data.pathName && sidebar
                  ? "bg-[#685cfe] text-white"
                  : "text-[#222222] bg-gray-200 dark:text-[#393a3a] dark:bg-white"
              } flex items-center space-x-4 rounded-md p-2 font-medium font-inter duration-300 transition-all ${
                dropDown ? "my-3" : "my-6"
              }`}
            >
              <Link href={`${data.pathName ? data.pathName : ""}`}>
                <Icon className="w-6 h-6 " />
              </Link>
              <Link
                href={`${data.pathName ? data.pathName : ""}`}
                onClick={() => {
                  handleSidebar();
                }}
              >
                {data.pathName ? (
                  <span>{data.title}</span>
                ) : (
                  <button
                    onClick={() => {
                      setDropDown(!dropDown);
                    }}
                    className="cursor-pointer flex items-center justify-between w-53.5"
                  >
                    {data.title} <ChevronDown className="" />
                  </button>
                )}
              </Link>
            </li>

            {/* DropDown */}
            {data.dropdown &&
              dropDown &&
              data.dropdown?.map((label) => {
                const DropDown = label.icon; // Icon Data Store
                return (
                  <Link
                    href={`${label.path}`}
                    key={label.id}
                    className={` ${
                      pathName === data.pathName && sidebar
                        ? "bg-[#685cfe] text-white "
                        : "text-[#222222] bg-[#f6f4ff]"
                    } flex items-center space-x-4 rounded-md my-3 px-2 py-1 font-inter font-medium`}
                  >
                    <DropDown /> <span>{label.title}</span>
                  </Link>
                );
              })}
          </ul>
        );
      })}
    </div>
  );
}

export default Sidebar;
