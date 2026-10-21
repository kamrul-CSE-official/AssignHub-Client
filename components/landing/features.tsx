import {
  BarChart3,
  Bell,
  CalendarClock,
  ClipboardList,
  FileCheck2,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: ClipboardList,
    title: "Assignment builder",
    description:
      "Create rich assignments with attachments, rubrics, and file-type restrictions in minutes.",
  },
  {
    icon: CalendarClock,
    title: "Smart deadlines",
    description:
      "Automatic reminders, late-submission windows, and timezone-aware due dates for every class.",
  },
  {
    icon: FileCheck2,
    title: "One-click grading",
    description:
      "Annotate submissions, apply rubrics, and publish grades with instant student notifications.",
  },
  {
    icon: BarChart3,
    title: "Analytics dashboards",
    description:
      "Track submission rates, class averages, and at-risk students at a glance.",
  },
  {
    icon: Bell,
    title: "Real-time notifications",
    description:
      "Email and in-app alerts keep students and instructors aligned — no more missed work.",
  },
  {
    icon: Shield,
    title: "Plagiarism checks",
    description:
      "Built-in similarity detection and secure file storage keep academic integrity intact.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built for teachers who want to spend less time on admin and more
            time teaching.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card
              key={f.title}
              className="border-border/60 transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{f.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {f.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
