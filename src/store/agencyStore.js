import { create } from "zustand";

const deepClone = (data) => JSON.parse(JSON.stringify(data));

export const useAgencyStore = create((set, get) => ({
  agencies: [],
  originalAgencies: [],
  selectedAgencyIndex: 0,
  isDirty: false,

  setAgencies: (data) => {
    const cloned = deepClone(data);

    set({
      agencies: cloned,
      originalAgencies: deepClone(cloned),
      selectedAgencyIndex: 0,
      isDirty: false,
    });
  },
  loadFromStorage: () => {
    const data = localStorage.getItem("agencies");

    if (data) {
      const parsed = JSON.parse(data);

      set({
        agencies: parsed,
        originalAgencies: deepClone(parsed),
        selectedAgencyIndex: 0,
        isDirty: false,
      });
    }
  },

  saveToStorage: () => {
    const { agencies } = get();
    localStorage.setItem("agencies", JSON.stringify(agencies));
  },

  resetOriginal: () => {
    const { agencies } = get();

    set({
      originalAgencies: deepClone(agencies),
      isDirty: false,
    });
  },

  checkDirty: () => {
    const { agencies, originalAgencies } = get();

    const dirty =
      JSON.stringify(agencies) !== JSON.stringify(originalAgencies);

    set({ isDirty: dirty });
  },

  addAgency: () => {
    const newAgency = {
      id: Date.now(),
      agencyName: "",
      agencyType: "",
      completionDate: "",
      notes: "",
      pocs: [],
    };

    set((state) => ({
      agencies: [...state.agencies, newAgency],
      selectedAgencyIndex: state.agencies.length,
    }));

    get().checkDirty();
  },

  updateAgency: (index, updated) => {
    set((state) => {
      const agencies = [...state.agencies];
      agencies[index] = { ...agencies[index], ...updated };
      return { agencies };
    });

    get().checkDirty();
  },

  removeAgency: (index) => {
    set((state) => {
      const agencies = state.agencies.filter((_, i) => i !== index);

      let newIndex = state.selectedAgencyIndex;

      if (index === state.selectedAgencyIndex) {
        newIndex = Math.max(0, index - 1);
      } else if (index < state.selectedAgencyIndex) {
        newIndex = state.selectedAgencyIndex - 1;
      }

      return {
        agencies,
        selectedAgencyIndex: newIndex,
      };
    });

    get().checkDirty();
  },

  setSelectedAgency: (index) =>
    set({ selectedAgencyIndex: index }),

  addPOC: (agencyIndex) => {
    set((state) => {
      const agencies = [...state.agencies];

      agencies[agencyIndex].pocs.push({
        id: Date.now(),
        gender: "Mr.",
        name: "",
        email: "",
        countryCode: "+91",
        phoneNumber: "",
      });

      return { agencies };
    });

    get().checkDirty();
  },

  updatePOC: (agencyIndex, pocIndex, updated) => {
    set((state) => {
      const agencies = [...state.agencies];

      agencies[agencyIndex].pocs[pocIndex] = {
        ...agencies[agencyIndex].pocs[pocIndex],
        ...updated,
      };

      return { agencies };
    });

    get().checkDirty();
  },

  removePOC: (agencyIndex, pocIndex) => {
    set((state) => {
      const agencies = [...state.agencies];

      agencies[agencyIndex].pocs = agencies[
        agencyIndex
      ].pocs.filter((_, i) => i !== pocIndex);

      return { agencies };
    });

    get().checkDirty();
  },


  getDiffPayload: () => {
    const { agencies, originalAgencies } = get();

    const mapById = (arr) =>
      Object.fromEntries(arr.map((a) => [a.id, a]));

    const originalMap = mapById(originalAgencies);
    const currentMap = mapById(agencies);

    // ADD
    const agenciesToAdd = agencies.filter(
      (a) => !originalMap[a.id]
    );

    // REMOVE
    const agenciesToRemove = originalAgencies.filter(
      (a) => !currentMap[a.id]
    );

    // UPDATE (partial fields only)
    const agenciesToUpdate = agencies
      .filter((a) => originalMap[a.id])
      .map((a) => {
        const original = originalMap[a.id];

        const updatedFields = {};

        Object.keys(a).forEach((key) => {
          if (
            JSON.stringify(a[key]) !==
            JSON.stringify(original[key])
          ) {
            updatedFields[key] = a[key];
          }
        });

        return Object.keys(updatedFields).length > 0
          ? { id: a.id, ...updatedFields }
          : null;
      })
      .filter(Boolean);

    return {
      agenciesToAdd,
      agenciesToUpdate,
      agenciesToRemove,
    };
  },
}));