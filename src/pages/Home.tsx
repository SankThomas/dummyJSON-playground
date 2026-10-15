import { ArrowRight, Code2, ExternalLink, Search, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { endpoints } from "../data/endpoints";
import EndpointCard from "../components/EndpointCard";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-badge">
          <Code2 className="size-4" />
          DummyJSON API Explorer
        </div>

        <h1 className="hero-title">
          Explore
          <br />
          <span>TheDummyJSON API.</span>
        </h1>

        <p className="hero-description">
          A "playground" to learn the Dummy JSON API
        </p>

        <div className="hero-actions gap-4">
          <Link to="/products" className="button button-primary">
            Explore products
            <ArrowRight className="size-4" />
          </Link>

          <a
            href="https://dummyjson.com/docs"
            target="_blank"
            rel="noreferrer"
            className="button button-secondary"
          >
            Documentation
            <ExternalLink className="size-4" />
          </a>
        </div>
      </section>

      <section className="endpoint-section">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">AVAILABLE RESOURCES</p>

            <h2>Choose an endpoint</h2>
          </div>

          <p>{endpoints.length} resources available</p>
        </div>

        <div className="endpoint-grid">
          {endpoints.map((endpoint) => (
            <EndpointCard key={endpoint.id} endpoint={endpoint} />
          ))}
        </div>
      </section>
    </main>
  );
}
