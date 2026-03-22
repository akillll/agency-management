import { create } from "zustand";

const initialState = {
  agencies: [],
  originalAgencies: [],
  selectedAgencyIndex: 0,
};

export const useAgencyStore = create((set, get) => ({
  ...initialState,

  setAgencies: (data) =>
    set({
      agencies: data,
      originalAgencies: JSON.parse(JSON.stringify(data)),
    }),

  addAgency: () =>
    set((state) => ({
      agencies: [
        ...state.agencies,
        {
          id: Date.now(),
          agencyName: "",
          agencyType: "",
          completionDate: "",
          notes: "",
          pocs: [],
        },
      ],
      selectedAgencyIndex: state.agencies.length,
    })),

  updateAgency: (index, updated) =>
    set((state) => {
      const agencies = [...state.agencies];
      agencies[index] = { ...agencies[index], ...updated };
      return { agencies };
    }),

  removeAgency: (index) =>
    set((state) => {
      const agencies = state.agencies.filter((_, i) => i !== index);
      return {
        agencies,
        selectedAgencyIndex: 0,
      };
    }),

  addPOC: (agencyIndex) =>
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
    }),

  updatePOC: (agencyIndex, pocIndex, updated) =>
    set((state) => {
      const agencies = [...state.agencies];
      agencies[agencyIndex].pocs[pocIndex] = {
        ...agencies[agencyIndex].pocs[pocIndex],
        ...updated,
      };
      return { agencies };
    }),

  removePOC: (agencyIndex, pocIndex) =>
    set((state) => {
      const agencies = [...state.agencies];
      agencies[agencyIndex].pocs = agencies[agencyIndex].pocs.filter(
        (_, i) => i !== pocIndex
      );
      return { agencies };
    }),

  setSelectedAgency: (index) =>
    set({ selectedAgencyIndex: index }),
}));