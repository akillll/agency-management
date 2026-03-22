import { useAgencyStore } from "../../../store/agencyStore";
import Input from "../../base/Input";
import Textarea from "../../base/Textarea";

const agencyTypes = [
  "AOR",
  "PERFORMANCE_MARKETING",
  "SOCIAL_MEDIA_MARKETING",
  "OTHERS",
];

export default function AgencyDetails() {
  const { agencies, selectedAgencyIndex, updateAgency } = useAgencyStore();

  const agency = agencies[selectedAgencyIndex];

  if (!agency) return null;

  const handleChange = (field, value) => {
    updateAgency(selectedAgencyIndex, {
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      {/* Agency Name */}
      <div>
        <label className="text-sm text-gray-300">Agency Name*</label>
        <Input
          value={agency.agencyName}
          onChange={(e) => handleChange("agencyName", e.target.value)}
        />
      </div>

      {/* Agency Type */}
      <div>
        <label className="text-sm text-gray-300">Agency Type*</label>
        <div className="flex gap-2 flex-wrap mt-2">
          {agencyTypes.map((type) => {
            const isSelected = agency.agencyType === type;

            return (
              <button
                key={type}
                onClick={() => handleChange("agencyType", type)}
                className={`px-4 py-2 rounded-full border
                  ${
                    isSelected
                      ? "bg-white text-black"
                      : "border-gray-600 text-white"
                  }
                `}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion Date */}
      <div>
        <label className="text-sm text-gray-300">
          Partnership Completion*
        </label>
        <Input
          type="month"
          value={agency.completionDate}
          onChange={(e) =>
            handleChange("completionDate", e.target.value)
          }
        />
      </div>

      {/* Notes */}
      <div>
        <label className="text-sm text-gray-300">Notes*</label>
        <Textarea
          rows={4}
          value={agency.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
      </div>
    </div>
  );
}