export const validateAgency = (agency, allAgencies) => {
  const errors = {};

  // Agency Name
  if (!agency.agencyName || agency.agencyName.trim().length < 2) {
    errors.agencyName = "Min 2 characters required";
  }

  // Duplicate check
  const duplicate = allAgencies.filter(
    (a) =>
      a.agencyName.trim().toLowerCase() ===
      agency.agencyName.trim().toLowerCase()
  );

  if (duplicate.length > 1) {
    errors.agencyName = "Duplicate agency name";
  }

  // Type
  if (!agency.agencyType) {
    errors.agencyType = "Required";
  }

  // Date (must be current or future month)
  if (!agency.completionDate) {
    errors.completionDate = "Required";
  } else {
    const selected = new Date(agency.completionDate);
    const now = new Date();
    now.setDate(1);

    if (selected < now) {
      errors.completionDate = "Must be current/future";
    }
  }

  // Notes
  if (!agency.notes || agency.notes.trim().length < 10) {
    errors.notes = "Min 10 characters required";
  }

  return errors;
};

export const validatePOC = (poc) => {
  const errors = {};

  if (!poc.name || poc.name.trim().length === 0) {
    errors.name = "Name required";
  }

  if (poc.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(poc.email)) {
      errors.email = "Invalid email";
    }
  }

  if (poc.phoneNumber) {
    if (!/^\d{7,15}$/.test(poc.phoneNumber)) {
      errors.phoneNumber = "Invalid phone";
    }
  }

  return errors;
};