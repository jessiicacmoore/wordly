import { ThemeToggle } from "@/features/theme";
import { Container } from "./Container";

type AppLayoutProps = {
  children?: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <Container className="border-bg-alt border-b-2 py-4">
          <h1 className="text-center font-serif text-2xl tracking-widest">
            Wordly<span className="text-accent font-bold">.</span>
          </h1>
        </Container>
      </header>
      <main className="flex-1">
        <Container>{children}</Container>
      </main>
      <footer className="bg-bg-alt pt-5 pb-8">
        <Container className="flex items-center justify-around">
          <div>
            <ThemeToggle />
          </div>
          <p className="text-muted-foreground text-center text-sm font-bold">
            &copy; {new Date().getFullYear()} Built by Jess. All rights
            reserved.
          </p>
          <nav aria-label="Footer Navigation">
            <ul className="flex space-x-4 text-sm font-bold">
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </Container>
      </footer>
    </div>
  );
};
