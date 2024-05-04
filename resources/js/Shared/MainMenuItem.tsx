import { Link } from "@inertiajs/react";
import clsx from "clsx";
import Icon from "./Icon";

export default function MainMenuItem({
    icon,
    link,
    text,
}: {
    icon: string;
    link: string;
    text: string;
}) {
    const isActive = route().current(link + "*");

    const iconClasses = clsx("w-4 h-4 mr-2", {
        "text-white fill-current": isActive,
        "text-indigo-400 group-hover:text-white fill-current": !isActive,
    });

    const textClasses = clsx({
        "text-white": isActive,
        "text-indigo-200 group-hover:text-white": !isActive,
    });
    return (
        <div className="mb-4">
            <Link href={route(link)} className="flex items-center group py-3">
                <Icon name={icon} className={iconClasses} />
                <div className={textClasses}>{text}</div>
            </Link>
        </div>
    );
}
