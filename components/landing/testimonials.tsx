import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "50k+", label: "Assignments graded weekly" },
  { value: "1,200+", label: "Schools onboarded" },
  { value: "98%", label: "Teacher satisfaction" },
  { value: "4.9/5", label: "Average rating" },
];

const testimonials = [
  {
    quote:
      "I used to spend my Sunday nights chasing submissions. AssignHub gave me my weekends back — grading is now a 20-minute job.",
    name: "Sarah Mitchell",
    role: "AP History Teacher, Lincoln High",
  },
  {
    quote:
      "The analytics let me spot struggling students weeks earlier than before. It's changed how our department handles interventions.",
    name: "David Okafor",
    role: "Department Head, Northfield Academy",
  },
  {
    quote:
      "Students actually submit on time now. The reminders and clear deadlines removed all the excuses.",
    name: "Priya Raman",
    role: "Biology Teacher, Cedar Grove",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="border-t bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-2xl border bg-card p-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by teachers and students
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border/60">
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-foreground">
                  &quot;{t.quote}&quot;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
