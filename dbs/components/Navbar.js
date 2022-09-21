import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import logo from "../public/logo.png";
import userPic from "../public/user.png";
import { useRouter } from "next/router";
import { UserContext } from "../lib/context";
import { getAuth, signOut } from "firebase/auth";

var loggedIn = false;

const navigation = [
  // {
  //   name: "Home",
  //   href: "/",
  //   current: true,
  // },
  // {
  //   name: "Meet Our Team",
  //   href: "/about",
  //   current: false,
  // },
  // {
  //   name: "Contact",
  //   href: "/contact",
  //   current: false,
  // },
  //   { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();
  const path = router.pathname;
  const context = useContext(UserContext);
  const auth = getAuth();
  // console.log(context);

  const signUserOut = () => {
    signOut(auth);
  };

  return (
    <Disclosure as="nav" className="bg-[#f5f5f6]">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <div className="hidden md:flex items-center pr-2 max-w-16">
                    <Image
                      alt="logo"
                      src={logo}
                      // layout="responsive"
                      width={40}
                      height={40}
                    />
                  </div>
                  <h1 className="text-xl font-bold text-gray-300">
                    Best Mobile
                  </h1>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-2 md:space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        {...(path == item.href
                          ? (item.current = true)
                          : (item.current = false))}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {context.firstName ? (
                  <div className="flex items-center">
                    <div className="pr-2">
                      <button
                        className="bg-red-300 p-2 rounded-xl hover:bg-red-400"
                        onClick={signUserOut}
                      >
                        Sign Out
                      </button>
                    </div>
                    <div className="pr-4">Hi, {context.firstName}!</div>
                    <Image src={userPic} width={20} height={20} />
                  </div>
                ) : null}
                {/* Profile dropdown */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
