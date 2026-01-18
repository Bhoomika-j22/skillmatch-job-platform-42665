import React, { forwardRef, useId } from "react";

/** Small presentational components mapped to App.css utility classes. */

// PUBLIC_INTERFACE
export function Card({
  title,
  header,
  footer,
  compact = false,
  children,
  className = "",
}) {
  /** Card container with optional title, header/footer slots, and compact mode. */
  const cls = ["card", compact ? "compact" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <section className={cls.trim()}>
      {(title || header) && (
        <div className="card-header">
          <div style={{ minWidth: 0 }}>
            {title ? <h3 className="card-title">{title}</h3> : null}
          </div>
          {header ? <div>{header}</div> : null}
        </div>
      )}
      {children}
      {footer ? <div className="card-footer">{footer}</div> : null}
    </section>
  );
}

// PUBLIC_INTERFACE
export function Badge({ variant = "default", children, className = "" }) {
  /** Rounded badge with theme variants: default|primary|secondary|success|error|warn|info */
  const cls = ["badge", variant !== "default" ? variant : "", className]
    .filter(Boolean)
    .join(" ");
  return <span className={cls}>{children}</span>;
}

// PUBLIC_INTERFACE
export function Button({
  variant = "default",
  size = "md",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}) {
  /** Button with variants: default | primary | secondary | ghost; sizes: sm|md|lg; optional loading state. */
  const cls = ["btn", variant !== "default" ? variant : "", size, className]
    .filter(Boolean)
    .join(" ");
  const isDisabled = !!disabled || !!loading;

  return (
    <button
      className={cls.trim()}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...props}
    >
      {loading ? <span className="btn-spinner" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  );
}

// PUBLIC_INTERFACE
export const Input = forwardRef(function Input(
  { label, helperText, error, id, className = "", ...props },
  ref,
) {
  /**
   * Text input with app styling and optional label/helper/error text.
   * If `error` is truthy, sets aria-invalid and renders the error as helper text.
   */
  const autoId = useId();
  const inputId = id || autoId;
  const helpId = `${inputId}-help`;
  const describedBy = helperText || error ? helpId : undefined;

  if (label || helperText || error) {
    return (
      <div className={`field ${className}`.trim()}>
        {label ? (
          <label className="field-label" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className="input"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {helperText || error ? (
          <div id={helpId} className="field-help">
            {error ? String(error) : helperText}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <input
      ref={ref}
      id={inputId}
      className={`input ${className}`.trim()}
      {...props}
    />
  );
});

// PUBLIC_INTERFACE
export function Select({
  label,
  helperText,
  error,
  id,
  className = "",
  children,
  ...props
}) {
  /** Select with app styling and optional label/helper/error text. */
  const autoId = useId();
  const selectId = id || autoId;
  const helpId = `${selectId}-help`;
  const describedBy = helperText || error ? helpId : undefined;

  if (label || helperText || error) {
    return (
      <div className={`field ${className}`.trim()}>
        {label ? (
          <label className="field-label" htmlFor={selectId}>
            {label}
          </label>
        ) : null}
        <select
          id={selectId}
          className="select"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          {...props}
        >
          {children}
        </select>
        {helperText || error ? (
          <div id={helpId} className="field-help">
            {error ? String(error) : helperText}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <select id={selectId} className={`select ${className}`.trim()} {...props}>
      {children}
    </select>
  );
}
