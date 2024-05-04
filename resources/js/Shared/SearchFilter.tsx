import { usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { usePrevious } from "react-use";
import SelectInput from "./SelectInput";

export default function SearchFilter() {
    const { filters } = usePage().props;
    const [opened, setOpened] = useState(false);
    const [values, setValues] = useState({
        role: filters.role || "",
        search: filters.search || "",
        trashed: filters.trashed || "",
    });

    const prevValues = usePrevious(values);

    function reset() {
        setValues({
            role: "",
            search: "",
            trashed: "",
        });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.name;
        const value = e.target.value;

        setValues((values) => ({
            ...values,
            [key]: value,
        }));
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
                        {filters.hasOwnProperty("role") && (
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
                <button onClick={()=>setOpened(true)} className="px-4 border-r rounded-l md:px-6 hover:bg-gray-100 focus:outline-none focus:border-white focus:ring-2 focus:ring-indigo-400 focus:z-10"></button>
            </div>
        </div>
    );
}
