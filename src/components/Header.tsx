import { Code } from "lucide-react";

export default function Header() {
  return (
    <header className="space-y-3">
      <div className="flex items-center gap-2">
        <Code className="stroke-primary" />
        <h1 className="text-xl">Dev Conf</h1>
      </div>

      <p className="text-muted-foreground text-sm">
        Join a high–impact developer conference featuring expert talks, hands-on
        workshops, and deep dives into the latest tools, frameworks, and
        industry trends..
      </p>
    </header>
  );
}
