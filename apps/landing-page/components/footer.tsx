import { Container } from "@repo/ui";
import { Cloud } from "@repo/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <Cloud className="size-5 text-brand-600" />
            <span>Ti Kloud</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Ti Kloud. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
