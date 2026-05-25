import clsx from "clsx";


export type NavItemProps = {
    label: string;
    href: string;
    active? : boolean;
    disabled? : boolean;
    target? : "_blank" | "self" | "parent" | "top";
    className? : string;
    leadingIcon? : React.ReactNode;
    trailingIcon? : React.ReactNode;
    badge? : React.ReactNode;
}

export const NavItem = ({
    label,
    href,
    active = false,
    disabled = false,
    target = "self",
    className,
    leadingIcon,
    badge,
    trailingIcon,
    ...props
} : NavItemProps) => {

    return (
        <a
        href={disabled ? undefined : href}
        aria-disabled={disabled}
        target={target}
        className={clsx(
            "relative flex items-center p-3 rounded-lg text-sm font-semibold",
            disabled
                ? "bg-neutral-300 text-neutral-800 hover:bg-neutral-400 hover:text-neutral-900 cursor-not-allowed"
                : active
                    ? "bg-primary-900 text-white hover:bg-primary-900"
                    : "bg-primary-900 text-white hover:bg-primary-900 hover:text-white",
                    
            className
        )}
        {...props}
        >
        {leadingIcon && <span className="mr-2">{leadingIcon}</span>}

        {label}
        {badge && <span className="absolute -top-2 -right-2 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold ">{badge}</span>}
        {trailingIcon && <span className="ml-2 border-2 border-white rounded-full">{trailingIcon}</span>}

        </a>
    )
}


