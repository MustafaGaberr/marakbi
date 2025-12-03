import { create } from "zustand";

type AdminTab = "overview" | "orders" | "boat-listings" | "bookings" | "users";

type AdminTabStore = {
  currentTab: AdminTab;
  setTab: (tab: AdminTab) => void;
};

const useAdminTab = create<AdminTabStore>((set) => ({
  currentTab: "orders",
  setTab: (tab) => set({ currentTab: tab }),
}));

export default useAdminTab;
