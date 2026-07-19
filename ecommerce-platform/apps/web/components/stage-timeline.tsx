import { Badge } from "@repo/ui/badge";
import { Card } from "@repo/ui/card";
import { deliveryStages } from "../lib/platform-content";

export function StageTimeline() {
  return (
    <section className="space-y-5 pb-6">
      <div className="space-y-2">
        <Badge>Execution roadmap</Badge>
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          What this foundation enables next
        </h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
          The monorepo is ready for feature modules such as
          catalog, cart, checkout, orders, authentication, and
          notifications to be layered in without reworking the
          core application shell.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {deliveryStages.map((stage, index) => (
          <Card
            key={stage.title}
            tone={index === 0 ? "success" : "default"}
            className="space-y-4"
          >
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Phase {index + 1}
              </p>
              <h3 className="text-xl font-semibold text-white">
                {stage.title}
              </h3>
              <p className="text-sm leading-6 text-slate-300">
                {stage.description}
              </p>
            </div>
            <ul className="space-y-2 text-sm text-slate-200">
              {stage.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 text-cyan-300">•</span>
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
