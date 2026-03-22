import { useState } from "react";
import { useAgencyStore } from "../../../store/agencyStore";

export default function POCTabs() {
  const { agencies, selectedAgencyIndex, addPOC, removePOC } =
    useAgencyStore();

  const [selectedPOCIndex, setSelectedPOCIndex] = useState(0);

  const agency = agencies[selectedAgencyIndex];
  const pocs = agency?.pocs || [];

  return (
    <div className="mt-6">
      <div className="flex gap-2 flex-wrap">
        {pocs.map((poc, index) => {
          const isActive = index === selectedPOCIndex;

          return (
            <div
              key={poc.id}
              onClick={() => setSelectedPOCIndex(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer
                ${
                  isActive
                    ? "bg-white text-black"
                    : "border-gray-600 text-white"
                }
              `}
            >
              <span>POC {index + 1}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removePOC(selectedAgencyIndex, index);
                  setSelectedPOCIndex(0);
                }}
              >
                ✕
              </button>
            </div>
          );
        })}

        <button
          onClick={() => addPOC(selectedAgencyIndex)}
          className="px-4 py-2 rounded-full border border-gray-600"
        >
          + ADD POC
        </button>
      </div>

      {pocs.length > 0 && (
        <div className="mt-4">
          <POCForm selectedPOCIndex={selectedPOCIndex} />
        </div>
      )}
    </div>
  );
}

import POCForm from "./POCForm";