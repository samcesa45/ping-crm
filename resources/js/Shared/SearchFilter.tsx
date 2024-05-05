import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { usePrevious } from "react-use";
import SelectInput from "./SelectInput";
import { FilterProps } from "@/types";
import { router } from "@inertiajs/react";
import pickBy from 'lodash/pickBy'

export default function SearchFilter() {
    const { filters } = usePage<FilterProps>().props;
    // console.log(filters.role);
    const [opened, setOpened] = useState(false);

    const [values, setValues] = useState({
        role: filters?.role || "",
        search: filters?.search || "",
        trashed: filters?.trashed || "",
    });

    const prevValues = usePrevious(values);

    function reset() {
        setValues({
            role: "",
            search: "",
            trashed: "",
        });
    }

   /*  type Predicate<T> = (value: T, key: string) => boolean;
    function pickBy<T>(
        obj: Record<string, T>,
        predicate: Predicate<T>
    ): Record<string, T> {
        return Object.fromEntries(
            Object.entries(obj).filter(([key, value]) => predicate(value, key))
        );
    } */

    useEffect(() => {
        if (prevValues) {
            const query = Object.keys(pickBy(values)).length
                ? pickBy(values)
                : { remember: "forget" };
            router.get(route(route().current()), query, {
                replace: true,
                preserveState: true,
            });
        }
    }, [values]);

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const key = e.target.name;
        const value = e.target.value;

        setValues((values) => ({
            ...values,
            [key]: value,
        }));

        if (opened) setOpened(false);
    }
    return (
        <div className="flex items-center w-full max-w-md mr-4">
            <div className="relative flex w-full bg-white rounded shadow">
                <div
                    style={{ top: "100%" }}
                    className={`absolute ${opened ? "" : "hidden"}`}
                >
                    <div
                        onClick={() => setOpened(false)}
                        className="fixed inset-0 z-20 bg-black opacity-25"
                    ></div>
                    <div className="relative z-30 w-64 px-4 py-6 mt-2 bg-white rounded shadow-lg">
                        {filters?.hasOwnProperty("role") && (
                            <SelectInput
                                className="mb-4"
                                label="Role"
                                name="role"
                                value={values.role}
                                onChange={handleChange}
                            >
                                <option value=""></option>
                                <option value="user">User</option>
                                <option value="owner">Owner</option>
                            </SelectInput>
                        )}
                        <SelectInput
                            className=""
                            label="Trashed"
                            name="trashed"
                            value={values.trashed}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="with">with Trashed</option>
                            <option value="only">Only Trashed</option>
                        </SelectInput>
                    </div>
                </div>
                <button
                    onClick={() => setOpened(true)}
                    className="px-4 border-r rounded-l md:px-6 hover:bg-gray-100 focus:outline-none focus:border-white focus:ring-2 focus:ring-indigo-400 focus:z-10"
                >
                    <div className="flex items-baseline">
                        <span className="hidden text-gray-700 md:inline">
                            Filter
                        </span>
                        <svg
                            className="w-2 h-2 text-gray-700 fill-current md:ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 961.243 599.998"
                        >
                            <path d="M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624 239.999-.345-.001-108.625-108.001-240.624-240z" />
                        </svg>
                    </div>
                </button>
                <input
                    className="relative w-full px-6 py-3 rounded-r focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    type="text"
                    name="search"
                    id="search"
                    value={values.search}
                    onChange={handleChange}
                    placeholder="Search..."
                />
            </div>
            <button
                onClick={reset}
                className="ml-3 text-sm text-gray-600 hover:text-gray-700 focus:text-indigo-700 focus:outline-none"
            >
                Reset
            </button>
        </div>
    );
}
