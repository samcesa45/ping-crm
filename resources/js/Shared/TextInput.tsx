export default function TextInput({
    label,
    name,
    type,
    className,
    errors = [],
    ...props
}: {
    label: string;
    name: string;
    type: string | "text";
    className: string;
    errors: Array<any>;
}) {
    return (
        <div className={className}>
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                {...props}
                className={`form-input ${errors.length ? "error" : ""}`}
            />
            {errors && <div className="form-error">{errors}</div>}
        </div>
    );
}
