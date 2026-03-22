import { useAgencyStore } from "../store/agencyStore";
import { validateAgency, validatePOC } from "../utils/validation";

export const useAgencyValidation = () => {
  const { agencies } = useAgencyStore();

  const agencyErrors = agencies.map((agency) =>
    validateAgency(agency, agencies)
  );

  const pocErrors = agencies.map((agency) =>
    agency.pocs.map((poc) => validatePOC(poc))
  );

  const hasAgencyError = (index) =>
    Object.keys(agencyErrors[index] || {}).length > 0;

  const hasPOCError = (agencyIndex) =>
    (pocErrors[agencyIndex] || []).some(
      (err) => Object.keys(err).length > 0
    );

  return {
    agencyErrors,
    pocErrors,
    hasAgencyError,
    hasPOCError,
  };
};