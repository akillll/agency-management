import { useAgencyStore } from "../../../store/agencyStore";
import { useAgencyValidation } from "../../../hooks/useAgency";
import Input from "../../base/Input";

export default function POCForm({ selectedPOCIndex }) {
  const { agencies, selectedAgencyIndex, updatePOC } =
    useAgencyStore();

  const { pocErrors } = useAgencyValidation();

  const agency = agencies[selectedAgencyIndex];
  const poc = agency?.pocs[selectedPOCIndex];

  const errors =
    pocErrors[selectedAgencyIndex]?.[selectedPOCIndex] || {};

  if (!poc) return null;

  const handleChange = (field, value) => {
    updatePOC(selectedAgencyIndex, selectedPOCIndex, {
      [field]: value,
    });
  };

  return (
    <div className="space-y-4 border-t border-gray-700 pt-4">
      {/* Name */}
      <div>
        <label className="text-sm text-gray-300">
          POC Name*
        </label>
        <div className="flex gap-2">
          <select
            value={poc.gender}
            onChange={(e) =>
              handleChange("gender", e.target.value)
            }
            className="bg-gray-800 border border-gray-600 rounded-lg px-2 text-white"
          >
            <option>Mr.</option>
            <option>Ms.</option>
          </select>

          <Input
            value={poc.name}
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
          />
        </div>

        {errors.name && (
          <p className="text-red-400 text-xs mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="text-sm text-gray-300">
          POC Email
        </label>
        <Input
          type="email"
          value={poc.email}
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm text-gray-300">
          POC Number
        </label>
        <div className="flex gap-2">
          <select
            value={poc.countryCode}
            onChange={(e) =>
              handleChange("countryCode", e.target.value)
            }
            className="bg-gray-800 border border-gray-600 rounded-lg px-2 text-white"
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
          </select>

          <Input
            type="number"
            value={poc.phoneNumber}
            onChange={(e) =>
              handleChange("phoneNumber", e.target.value)
            }
          />
        </div>

        {errors.phoneNumber && (
          <p className="text-red-400 text-xs mt-1">
            {errors.phoneNumber}
          </p>
        )}
      </div>
    </div>
  );
}