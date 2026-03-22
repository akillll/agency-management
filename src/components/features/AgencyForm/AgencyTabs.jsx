import { useAgencyStore } from "../../../store/agencyStore";
import { useAgencyValidation } from "../../../hooks/useAgency";

export default function AgencyTabs() {
  const {
    agencies,
    selectedAgencyIndex,
    setSelectedAgency,
    addAgency,
    removeAgency,
  } = useAgencyStore();
  const { hasAgencyError, hasPOCError } = useAgencyValidation();

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {agencies.map((agency, index) => {
        const isActive = index === selectedAgencyIndex;

        return (
          <div
            key={agency.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border
              ${isActive ? "bg-white text-black" : "bg-transparent text-white border-gray-600"}
            `}
            onClick={() => setSelectedAgency(index)}
          >
            <span>AGENCY {index + 1}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                removeAgency(index);
              }}
              className="text-sm"
            >
              ✕
            </button>
          </div>
        );
      })}

      {/* Add Agency */}
      <button
        onClick={addAgency}
        className="px-4 py-2 rounded-full border border-gray-600 text-white"
      >
        + ADD AGENCY
      </button>
    </div>
  );
}