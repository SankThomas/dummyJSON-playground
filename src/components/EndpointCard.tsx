import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Endpoint } from "../data/endpoints";

interface EndpointCardProps {
  endpoint: Endpoint;
}

export default function EndpointCard({ endpoint }: EndpointCardProps) {
  const Icon = endpoint.icon;

  return (
    <Link to={endpoint.path} className="endpoint-card group">
      <div className="endpoint-card-image">
        <img
          src={endpoint.image}
          alt={endpoint.name}
          className="endpoint-card-photo"
        />

        <div className={`endpoint-icon ${endpoint.color}`}>
          <Icon className="size-5" />
        </div>
      </div>

      <div className="endpoint-card-content">
        <div>
          <p className="endpoint-card-label">GET /{endpoint.id}</p>

          <div className="flex items-center justify-between gap-3">
            <h2 className="endpoint-card-title">{endpoint.name}</h2>

            <ArrowUpRight className="size-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-950 dark:group-hover:text-white" />
          </div>
        </div>

        <p className="endpoint-card-description">{endpoint.description}</p>

        <div className="endpoint-card-footer">
          <code className="endpoint-path">dummyjson.com/{endpoint.id}</code>

          <span className="endpoint-arrow">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
