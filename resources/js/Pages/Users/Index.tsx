import { usePage } from "@inertiajs/react";
import React from "react";

export default function Index() {
    const { users } = usePage().props;
    const {
        data,
        meta: { links },
    } = users;
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Users</h1>
        </div>
    );
}
