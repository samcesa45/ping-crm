import clsx from "clsx";
import React from "react";

export default function LoadingButton({
    loading,
    className,
    children,
    ...props
}: {
    loading: boolean;
    className: string;
    children: React.ReactNode;
}) {
    const classNames = clsx(
        "flex items-center",
        "focus:outline-none",
        {
            "pointer-events-none bg-opacity-75 select-none": loading,
        },
        className
    );
    return (
        <button disabled={loading} className={classNames} {...props}>
            {loading && <div className="mr-2 btn-spinner" />}
            {children}
        </button>
    );
}
