"use client";
import { User } from "next-auth";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  CircuitBoardIcon,
  LayoutDashboardIcon,
  LogOut,
  UserCircle,
} from "lucide-react";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";

type Props = {
  user: Pick<User, "name" | "image" | "email">;
  userRole: { role: string | "" };
};

const UserAcountNav = ({ user, userRole }: Props) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-gray-900">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && (
              <p className="font-medium dark:text-gray-200 ">
                {user.name}{" "}
                {userRole.role === "admin" ? (
                  <span className="text-red-600">admin</span>
                ) : (
                  ""
                )}
              </p>
            )}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-gray-200">
                {user.email}
              </p>
            )}
          </div>
        </div>

        {userRole.role === "admin" ? (
          <>
            <DropdownMenuSeparator className="text-black" />

            <DropdownMenuItem className="text-blue-600 cursor-pointer">
              <Link href={"/analytics"} className="dark:text-gray-200">
                analytics
              </Link>
              <LayoutDashboardIcon className="w-4 h-4 ml-2" />
            </DropdownMenuItem>
          </>
        ) : null}

        <DropdownMenuSeparator className="text-black" />

        <DropdownMenuItem className="">
          <Link className="dark:text-gray-200" href={"/profile"}>
            {" "}
            Profile
          </Link>
          <UserCircle className="w-4 h-4 ml-2" />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="text-black" />
        <DropdownMenuSeparator className="text-black" />

        <DropdownMenuItem className="">
          <Link className="dark:text-gray-200" href={"/leaderboard"}>
            {" "}
            Leaderboard
          </Link>
          <CircuitBoardIcon className="w-4 h-4 ml-2" />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="text-black" />

        <DropdownMenuItem
          onClick={(e: any) => {
            e.preventDefault();
            signOut().catch(console.error);
            router.push("/");
          }}
          className="text-red-600 cursor-pointer"
        >
          <Link className="dark:text-gray-200" href={"/"}>
            {" "}
            Sign Out
          </Link>
          <LogOut className="w-4 h-4 ml-2" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAcountNav;
