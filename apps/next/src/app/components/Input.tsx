import classnames from 'classnames';

type InputProps = {
    label: string;
    name: string;
    required?: boolean;
    mutliLine?: boolean;
    shouldValidate?: boolean;
};

export const Input = ({
    label,
    name,
    required = false,
    mutliLine = false,
    shouldValidate = false,
}: InputProps) => {
    const className = classnames(
        'p-1 font-normal',
        'rounded border border-solid border-slate-200',
        'focus:outline-none focus:border-blue-600 focus:ring focus:ring-blue-100',
        shouldValidate && 'invalid:border-red-500'
    );

    return (
        <label className="flex flex-col justify-center gap-y-1 font-medium">
            {label}
            {required && '*'}
            {!mutliLine ? (
                <input
                    name={name}
                    type="text"
                    className={className}
                    required={required}
                />
            ) : (
                <textarea
                    name={name}
                    rows={4}
                    className={className}
                    required={required}
                ></textarea>
            )}
        </label>
    );
};
