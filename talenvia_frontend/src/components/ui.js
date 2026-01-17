import React from "react";

/** Small presentational components mapped to App.css utility classes. */

// PUBLIC_INTERFACE
export function Card({ title, children, className = "" }) {
  /** Card container with optional title. */
  return (
    <section className={`card ${className}`.trim()}>
      {title ? <h3 className="card-title">{title}</h3> : null}
      {children}
    </section>
  );
}

// PUBLIC_INTERFACE
export function Badge({ variant = "default", children }) {
  /** Rounded badge with theme variants. */
  const cls = variant === "primary" ? "badge primary" : variant === "secondary" ? "badge secondary" : "badge";
  return <span className={cls}>{children}</span>;
}

// PUBLIC_INTERFACE
export function Button({ variant = "default", className = "", ...props }) {
  /** Button with variants: default | primary | ghost */
  const cls = variant === "primary" ? "btn primary" : variant === "ghost" ? "btn ghost" : "btn";
  return <button className={`${cls} ${className}`.trim()} {...props} />;
}

// PUBLIC_INTERFACE
export function Input(props) {
  /** Text input with app styling. */
  return <input className="input" {...props} />;
}

// PUBLIC_INTERFACE
export function Select({ children, ...props }) {
  /** Select with app styling. */
  return (
    <select className="select" {...props}>
      {children}
    </select>
  );
}
