export default function Modal({ children }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-[#1e2430] rounded-2xl w-full max-w-[700px] h-[90vh] flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}