"use client";

import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import {
  capabilityCards,
  capabilityCategories,
  type CapabilityCategory,
} from "../lib/platform-content";
import { usePlatformStore } from "../lib/platform-store";

const categoryLabels: Record<CapabilityCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  ops: "DevOps",
};

export function CapabilityBoard() {
  const selectedCategory = usePlatformStore(
    (state) => state.selectedCategory,
  );
  const setSelectedCategory = usePlatformStore(
    (state) => state.setSelectedCategory,
  );

  const filteredCards =
    selectedCategory === "all"
      ? capabilityCards
      : capabilityCards.filter(
          (card) => card.category === selectedCategory,
        );

  return (
    <section id="capabilities" className="space-y-5">
      <div className="space-y-2">
        <Badge tone="success">Reusable feature modules</Badge>
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Platform capability map
        </h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
          The initial workspace is organized to support growth
          across customer experience, core commerce services, and
          platform operations without duplicating logic.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant={selectedCategory === "all" ? "primary" : "ghost"}
          onClick={() => setSelectedCategory("all")}
        >
          All capabilities
        </Button>
        {capabilityCategories.map((category) => (
          <Button
            key={category}
            variant={
              selectedCategory === category ? "primary" : "ghost"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {categoryLabels[category]}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {filteredCards.map((card) => (
          <Card key={card.title} className="space-y-4">
            <div className="space-y-2">
              <Badge tone="accent">
                {categoryLabels[card.category]}
              </Badge>
              <h3 className="text-xl font-semibold text-white">
                {card.title}
              </h3>
              <p className="text-sm leading-6 text-slate-300">
                {card.description}
              </p>
            </div>
            <ul className="space-y-2 text-sm text-slate-200">
              {card.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 text-emerald-300">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
