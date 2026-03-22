import { useEffect } from "react";
import { useAgencyStore } from "../../store/agencyStore";
import AgencyForm from "../features/AgencyForm/AgencyForm";

export default function HomePage() {
  const { loadFromStorage } = useAgencyStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <AgencyForm />
    </div>
  );
}