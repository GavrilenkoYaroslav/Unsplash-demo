export default function Button({ children, className = '', ...props }) {
  return (
    <button {...props} className={`disabled:opacity-75 disabled:grayscale ${className}`}>
      {children}
    </button>
  );
}
