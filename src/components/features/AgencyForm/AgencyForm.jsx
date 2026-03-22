import Modal from "../../shared/Modal";
import AgencyTabs from "./AgencyTabs";
import AgencyDetails from "./AgencyDetails";
import POCTabs from "./POCTabs";
import Button from "../../base/Button";

import { useAgencyStore } from "../../../store/agencyStore";
import { useAgencyValidation } from "../../../hooks/useAgency";
import { isAgencyValidForPOC } from "./utils";

export default function AgencyForm() {
const agencies = useAgencyStore((s) => s.agencies);
const selectedAgencyIndex = useAgencyStore((s) => s.selectedAgencyIndex);
const isDirty = useAgencyStore((s) => s.isDirty);
const saveToStorage = useAgencyStore((s) => s.saveToStorage);
const resetOriginal = useAgencyStore((s) => s.resetOriginal);
const getDiffPayload = useAgencyStore((s) => s.getDiffPayload);

  const { agencyErrors, pocErrors } = useAgencyValidation();

  const agency = agencies[selectedAgencyIndex];

  const hasErrors =
    agencyErrors.some((e) => Object.keys(e).length > 0) ||
    pocErrors.some((arr) =>
      arr.some((e) => Object.keys(e).length > 0)
    );

  const handleSave = () => {
    const payload = getDiffPayload();

    console.log("FINAL PAYLOAD:", payload);

    saveToStorage();
    resetOriginal();
  };

  return (
    <Modal>
  <div className="text-white flex flex-col h-full">

    {/* HEADER */}
    <div className="p-6 border-b border-gray-700 shrink-0">
      <h2 className="text-xl font-semibold mb-4">
        Agency Details
      </h2>
      <AgencyTabs />
    </div>

    {/* SCROLLABLE CONTENT */}
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {agency && <AgencyDetails />}

      {isAgencyValidForPOC(agency) && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Agency POC Details
          </h3>
          <POCTabs />
        </div>
      )}
    </div>

    {/* FOOTER */}
    <div className="p-6 border-t border-gray-700 flex justify-between shrink-0">
      <button className="px-6 py-2 bg-gray-300 text-black rounded-lg">
        CANCEL
      </button>

      <Button
        onClick={handleSave}
        disabled={!isDirty || hasErrors}
      >
        SAVE
      </Button>
    </div>

  </div>
</Modal>
  );
}