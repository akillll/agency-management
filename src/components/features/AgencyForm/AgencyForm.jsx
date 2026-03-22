import Modal from "../../shared/Modal";
import AgencyTabs from "./AgencyTabs";
import AgencyDetails from "./AgencyDetails";
import POCTabs from "./POCTabs";
import { useAgencyStore } from "../../../store/agencyStore";
import { isAgencyValidForPOC } from "./utils";

export default function AgencyForm() {
  const { agencies, selectedAgencyIndex } = useAgencyStore();

  const agency = agencies[selectedAgencyIndex];

  return (
    <Modal>
      <div className="text-white">
        <h2 className="text-xl font-semibold mb-4">
          Agency Details
        </h2>

        <AgencyTabs />

        {agency && <AgencyDetails />}

        {/* ✅ CONDITIONAL POC */}
        {isAgencyValidForPOC(agency) && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Agency POC Details
            </h3>
            <POCTabs />
          </div>
        )}
      </div>
    </Modal>
  );
}