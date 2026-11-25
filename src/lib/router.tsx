import {
  createContext,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

/**
 * Minimal hash router — keeps the prototype fully static (works from a
 * single index.html) while still giving every page a shareable URL.
 */
export type Route = {
  path: string;
  segments: string[];
  query: URLSearchParams;
  search: string;
};

function parse(): Route {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [p, search = ""] = raw.split("?");
  const path = p.startsWith("/") ? p : `/${p}`;
  return {
    path,
    segments: path.split("/").filter(Boolean),
    query: new URLSearchParams(search),
    search,
  };
}

const RouteContext = createContext<Route | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    let lastPath = parse().path;
    const onChange = () => {
      const next = parse();
      setRoute(next);
      if (next.path !== lastPath) {
        lastPath = next.path;
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return <RouteContext.Provider value={route}>{children}</RouteContext.Provider>;
}

export function useRoute(): Route {
  const ctx = useContext(RouteContext);
  if (!ctx) throw new Error("useRoute must be used inside RouterProvider");
  return ctx;
}

export function navigate(to: string) {
  window.location.hash = to;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string };

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        onClick?.(e);
        // Clicking a link to the page you are already on scrolls back to the top.
        if (!e.defaultPrevented && window.location.hash === `#${to}`) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
