import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import Icon from "./Icon";
import { PageProps } from "@/types";

export default function BottomHeader() {
    const { auth } = usePage().props;
    const [menuOpened, setMenuOpened] = useState(false);
    return (
        <div className="flex items-center justify-between w-full p-4 text-sm bg-white border-b md:py-0 md:px-12 md:text-md">
            <div className="mt-1 mr-4">{auth?.user?.account?.name}</div>
            <div className="relative">
                <div
                    className="flex items-center cursor-pointer select-none group"
                    onClick={() => setMenuOpened(true)}
                >
                    <div className="mr-1 text-gray-800 whitespace-nowrap group-hover:text-indigo-600">
                        <span>{auth?.user?.first_name}</span>
                        <span className="hidden ml-1 md:inline">
                            {auth?.user.last_name}
                        </span>
                    </div>
                    <Icon
                        className="w-5 h-5 text-grey-800 fill-current group-hover:text-indigo-600 focus:text-indigo-600"
                        name="chevron-down"
                    />
                </div>
                <div className={menuOpened ? "" : "hidden"}>
                    <div className="absolute top-0 right-0 left-auto z-20 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
                        <Link
                            href={route("users.edit", auth?.user?.id)}
                            className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                            onClick={() => setMenuOpened(false)}
                        >
                            My Profile
                        </Link>
                        <Link
                            href={route("users")}
                            className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                            onClick={() => setMenuOpened(false)}
                        >
                            Manage Users
                        </Link>
                        <Link
                            as="button"
                            method="post"
                            href={route("users")}
                            className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                            onClick={() => setMenuOpened(false)}
                        >
                            Logout
                        </Link>
                    </div>
                    <div
                        onClick={() => setMenuOpened(false)}
                        className="fixed inset-0 z-10 bg-black opacity-25"
                    ></div>
                </div>
            </div>
        </div>
    );
}
