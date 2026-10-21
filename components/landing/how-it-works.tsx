import { Badge } from "@/components/ui/badge";

const steps = [
  {
    step: "01",
    title: "Create your class",
    description:
      "Set up a class in seconds and invite students with a single shareable link or class code.",
  },
  {
    step: "02",
    title: "Publish assignments",
    description:
      "Attach files, set rubrics and deadlines, then publish. Students see everything instantly.",
  },
  {
    step: "03",
    title: "Grade and analyze",
    description:
      "Review submissions side by side, apply grading rubrics, and watch performance insights update live.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            How it works
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Up and running in three steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No training required. Most teachers publish their first assignment
            in under five minutes.
          </p>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-border md:block" />
          {steps.map((s) => (
            <div key={s.step} className="relative">
              <div className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full border-4 border-background bg-primary text-lg font-bold text-primary-foreground shadow-md md:mx-0">
                {s.step}
              </div>
              <h3 className="mt-6 text-center text-xl font-semibold md:text-left">
                {s.title}
              </h3>
              <p className="mt-2 text-center text-muted-foreground md:text-left">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
