import Cookies from "js-cookie";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { BeatLoader } from "react-spinners";

import { useRouter } from "next/router";
import Image from "next/image";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { globalToast } from "../../utils/globaToast";

export default function CustomNavbar() {
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const path = router.pathname;
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const decode = jwt_decode(token);
      const uName = decode.Username;
      setUserName(uName);
    }
  }, [token]);

  const handleLogOut = () => {
    setLoading(true);
    Cookies.remove("token");
    dispatch(logout());
    if (!token) {
      setLoading(false);
      router.reload("/");
    }
    if (router.pathname === "/") {
      globalToast.success("success logout, !");
    }
  };

  return (
    <div className="navbar bg-gray-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li className={path === "/" ? "rounded-md bg-primary text-white" : null}>
              <Link href="/">Home</Link>
            </li>
            <li className={path === "/about" ? "rounded-md bg-primary text-white" : null}>
              <Link href="/about">About</Link>
            </li>
            <li className={path === "/games" ? "rounded-md bg-primary text-white" : null}>
              <Link href="/games">Games</Link>
            </li>
            <li className={path === "/contact" ? "rounded-md bg-primary text-white" : null}>
              <Link href="/contact">Contact</Link>
            </li>
            {token && (
              <li className={path === "/currentgameinfo" ? "rounded-md bg-primary text-white" : null}>
                <Link href="/currentgameinfo">Users Info</Link>
              </li>
            )}
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          Alpha Centaury
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className={path === "/" ? "rounded-md bg-primary text-white" : null}>
            <Link href="/">Home</Link>
          </li>
          <li className={path === "/about" ? "rounded-md bg-primary text-white" : null}>
            <Link href="/about">About</Link>
          </li>
          <li className={path === "/games" ? "rounded-md bg-primary text-white" : null}>
            <Link href="/games">Games</Link>
          </li>
          <li className={path === "/contact" ? "rounded-md bg-primary text-white" : null}>
            <Link href="/contact">Contact</Link>
          </li>
          {token && (
            <li className={path === "/currentgameinfo" ? "rounded-md bg-primary text-white" : null}>
              <Link href="/currentgameinfo">Users Info</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end text-white">
        {token ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-primary m-1">
              <BiUser className="w-10 h-10 " />
            </label>
            <ul
              tabIndex={0}
              className="text-gray-800 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <div className="p-2 flex w-full gap-4">
                <div className="flex items-center">
                  <Image src={"/Profile.png"} alt="yes" width={49} height={49} />
                </div>
                <div>
                  <p className="text-lg font-semibold">{username}</p>
                  <p>users</p>
                  <Link href="/profile">
                    <p className="text-primary ">view profile</p>
                  </Link>
                </div>
              </div>
              <div className="p-2 w-full  rounded-xl">
                <button className="btn btn-primary w-full" onClick={handleLogOut} disabled={loading}>
                  {loading ? <BeatLoader color="#fff" size={10} /> : "logout"}
                </button>
              </div>
            </ul>
          </div>
        ) : (
          <Link href="/auth/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}
