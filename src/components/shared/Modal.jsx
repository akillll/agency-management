export default function Modal({ children }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-[#1e2430] rounded-2xl p-6 w-[600px]">
        {children}
      </div>
    </div>
  );
}