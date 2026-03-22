export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white ${className}`}
      {...props}
    />
  );
}