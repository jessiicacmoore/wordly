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
      <main className="flex flex-1 flex-col justify-center align-middle">
        <Container>{children}</Container>
      </main>
      <footer className="bg-bg-alt pt-5 pb-8">
        <Container className="flex items-center">
          <div className="flex flex-1 justify-start">
            <ThemeToggle />
          </div>
          <div className="flex flex-1 justify-center">
            <p className="text-muted-foreground text-center text-sm font-bold">
              &copy; {new Date().getFullYear()} Built by Jess. All rights
              reserved.
            </p>
          </div>
          <div className="flex flex-1 justify-end">
            <nav aria-label="Footer Navigation">
              <ul className="flex space-x-4 text-sm font-bold">
                <li>
                  <a
                    href="https://www.linkedin.com/in/jesscodes/"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="http://jessthedev.com/"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/jessiicacmoore"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </footer>
    </div>
  );
};
