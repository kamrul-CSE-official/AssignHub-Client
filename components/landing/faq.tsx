import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do students need to create an account?",
    a: "Students join with a class code and either sign in with Google/Microsoft or create a free account. No downloads required — it works in any browser.",
  },
  {
    q: "Can I import assignments from Google Classroom or Canvas?",
    a: "Yes. Our Pro plan includes one-click importers for Google Classroom, Canvas, and Moodle, plus CSV import for rosters.",
  },
  {
    q: "How does the AI grading assistant work?",
    a: "It suggests rubric-aligned scores and feedback based on your own grading criteria. Every suggestion is reviewable — you stay in full control and always publish final grades yourself.",
  },
  {
    q: "Is student data secure?",
    a: "We are FERPA and GDPR compliant. Data is encrypted in transit and at rest, and we never sell or share student data. School plans include a signed data processing agreement.",
  },
  {
    q: "What happens after the free trial ends?",
    a: "Your account automatically moves to the Free plan. You keep all your classes and assignments — you simply lose access to Pro-only features until you upgrade.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Cancel from your billing settings at any time. You'll retain Pro access until the end of your current billing period.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? Reach out to our team.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
