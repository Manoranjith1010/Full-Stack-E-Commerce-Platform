"use client";

import { create } from "zustand";
import type { CapabilityCategory } from "./platform-content";

export type SelectedCapabilityCategory =
  | "all"
  | CapabilityCategory;

interface PlatformStore {
  selectedCategory: SelectedCapabilityCategory;
  setSelectedCategory: (
    category: SelectedCapabilityCategory,
  ) => void;
}

export const usePlatformStore = create<PlatformStore>((set) => ({
  selectedCategory: "all",
  setSelectedCategory: (selectedCategory) =>
    set({ selectedCategory }),
}));
