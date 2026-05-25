export interface AvatarProps {
    initials? : string;
    profilePictureUrl? : string;
    active? : boolean;
    onClick?: () => void;
    className? : string;
    
}

export const Avatar = ({
    initials,
    profilePictureUrl,
    active = false,
    onClick,
    className,
    ...props

} : AvatarProps) => {
    const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white bg-primary-700 cursor-pointer";
    const activeClasses = active ? "w-10 h-10 flex items-center justify-center rounded-full ring-2 ring-offset-2 ring-primary-500 object-cover" : "";
    return (

        <div
            className={`${baseClasses} ${activeClasses} ${className}`}
            onClick={onClick}
            {...props}
        >
            {profilePictureUrl ? (
                <img src={profilePictureUrl} alt="Profile" className={activeClasses} />
            ) : (
                <span>{initials}</span>
            )}
        </div>
    );

}