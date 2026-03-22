export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}