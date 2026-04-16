import clsx from "clsx";


export type NavItemProps = {
    label: string;
    href: string;
    active? : boolean;
    disabled? : boolean;
    target? : " _blank" | "self" | "parent" | "top";
    className? : string;
}

export const NavItem = ({
    label,
    href,
    active = false,
    disabled = false,
    target = "self",
    className,
    ...props
} : NavItemProps) => {

    return (
        <a
        href={href}
        target={target}
        className={clsx(
            "px-3 py-2 rounded-md text-sm font-medium",
            disabled
                ? "bg-neutral-300 text-neutral-800 hover:bg-neutral-400 hover:text-neutral-900 cursor-not-allowed"
                : active
                    ? "bg-primary-800 text-white hover:bg-primary-900"
                    : "bg-primary-600 text-white hover:bg-primary-900 hover:text-white",
            className
        )}
        {...props}
        >
        {label}

        </a>
    )
}


