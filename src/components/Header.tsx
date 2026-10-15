import { Code2, Home, Menu, Moon, Sun, X, GitBranch } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetch("https://dummyjson.com/test")
      .then((response) => {
        setApiOnline(response.ok);
      })
      .catch(() => {
        setApiOnline(false);
      });
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">
            <Code2 className="size-4" />
          </span>

          <span>
            API<span className="brand-muted">Explorer</span>
          </span>
        </Link>

        <div className="header-right">
          <div
            className="api-status"
            title={
              apiOnline === null
                ? "Checking DummyJSON API..."
                : apiOnline
                  ? "DummyJSON API is reachable"
                  : "DummyJSON API is unavailable"
            }
          >
            <span
              className={`api-status-dot ${
                apiOnline === false ? "api-status-offline" : ""
              }`}
            />

            {apiOnline === null
              ? "Checking API"
              : apiOnline
                ? "API Online"
                : "API Offline"}
          </div>

          <nav className={`header-nav ${open ? "header-nav-open" : ""}`}>
            <Link
              to="/"
              onClick={closeMenu}
              className={
                location.pathname === "/"
                  ? "header-link header-link-active"
                  : "header-link"
              }
            >
              <Home className="size-4" />
              Home
            </Link>

            <a
              href="https://github.com/sankthomas/dummyJSON-playground"
              target="_blank"
              rel="noreferrer"
              className="header-link"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>

            <a
              href="https://dummyjson.com/docs"
              target="_blank"
              rel="noreferrer"
              className="header-link"
            >
              Docs
            </a>
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            className="theme-button"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
