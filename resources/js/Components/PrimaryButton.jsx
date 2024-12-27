export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-md hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
