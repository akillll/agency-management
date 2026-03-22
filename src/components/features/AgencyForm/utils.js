export const isAgencyValidForPOC = (agency) => {
  if (!agency) return false;

  return (
    agency.agencyName.trim().length >= 2 &&
    agency.agencyType &&
    agency.completionDate &&
    agency.notes.trim().length >= 10
  );
};