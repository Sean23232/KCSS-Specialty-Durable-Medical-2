import { RouterProvider, useRoute } from "./lib/router";
import { UIProvider } from "./components/Overlays";
import { Footer, Header } from "./components/Layout";
import { Button, Container } from "./components/ui";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import { SpecialtiesIndex, SpecialtyPage } from "./pages/Specialties";
import About from "./pages/About";
import Contact from "./pages/Contact";

function NotFound() {
  return (
    <section className="bg-soft">
      <Container className="py-28 text-center lg:py-40">
        <p className="font-display text-[13px] font-extrabold tracking-[0.2em] text-navy/40">404</p>
        <h1 className="mt-4 font-display text-[44px] font-extrabold tracking-[-0.03em] text-navy">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-[17px] text-muted">
          The page you are looking for is not part of this concept. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/" variant="navy" arrow>
            Back to home
          </Button>
          <Button to="/shop" variant="outline">
            Explore products
          </Button>
        </div>
      </Container>
    </section>
  );
}

function Pages() {
  const route = useRoute();
  const [first, second] = route.segments;

  let page;
  if (!first) page = <Home />;
  else if (first === "shop") page = <Shop />;
  else if (first === "product") page = <ProductPage id={second} />;
  else if (first === "specialties") page = second ? <SpecialtyPage slug={second} /> : <SpecialtiesIndex />;
  else if (first === "about") page = <About />;
  else if (first === "contact") page = <Contact />;
  else page = <NotFound />;

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#/contact"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-[4px] focus:bg-gold focus:px-4 focus:py-2 focus:text-[14px] focus:font-semibold focus:text-navy"
      >
        Skip to contact information
      </a>
      <Header />
      {/* Re-mount on path change so each page starts fresh (scroll reveals, gallery state) */}
      <main key={route.path} className="flex-1">
        {page}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <UIProvider>
        <Pages />
      </UIProvider>
    </RouterProvider>
  );
}
