import '../styles/form-field.css';

export type FormFieldProps = {
  type?: 'text' | 'textarea' | 'number' | 'email';
  id: string;
  name?: string;
  label: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  rows?: number;
  errorId?: string;
  helperText?: string;
  onChange?: (event: Event) => void;
};

export default function FormField({
  type = 'text',
  id,
  name = id,
  label,
  placeholder = `Enter ${label.toLowerCase()}`,
  value = '',
  required = false,
  optional = false,
  disabled = false,
  rows = 3,
  errorId = `${id}Error`,
  helperText = '',
  onChange,
}: FormFieldProps) {
  const commonProps = {
    id,
    name,
    placeholder,
    disabled,
    required,
    value,
    onInput: onChange,
    onChange,
  } as const;

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required && <span className="required">*</span>}
        {optional && <span className="optional">(optional)</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          className="input-field textarea"
          rows={rows}
          {...commonProps}
        />
      ) : (
        <input
          className="input-field"
          type={type}
          {...commonProps}
        />
      )}

      <div className="error-message" id={errorId} aria-live="polite" />
      {helperText && <p className="helper-text">{helperText}</p>}
    </div>
  );
}
