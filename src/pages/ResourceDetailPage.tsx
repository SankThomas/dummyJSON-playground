import { ArrowLeft, Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import { endpoints } from "../data/endpoints";
import { fetchResourceById } from "../lib/api";

export default function ResourceDetailPage() {
  const { endpointId, resourceId } = useParams();

  const endpoint = endpoints.find((item) => item.id === endpointId);

  const [data, setData] = useState<Record<string, unknown> | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadResource() {
      if (!endpoint || !resourceId) return;

      try {
        setLoading(true);
        setError("");

        const result = await fetchResourceById(endpoint.id, resourceId);

        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load this resource.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadResource();
  }, [endpoint, resourceId]);

  if (!endpoint) {
    return (
      <main className="not-found">
        <h1>Endpoint not found</h1>

        <Link to="/" className="button button-primary">
          Back home
        </Link>
      </main>
    );
  }

  const handleCopy = async () => {
    if (!data) return;

    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const Icon = endpoint.icon;

  return (
    <main className="endpoint-page">
      <div className="page-container">
        <Link to={`/${endpoint.id}`} className="back-link">
          <ArrowLeft className="size-4" />
          Back to {endpoint.name}
        </Link>

        <section className="detail-header">
          <div className={`endpoint-header-icon ${endpoint.color}`}>
            <Icon className="size-6" />
          </div>

          <div>
            <div className="endpoint-header-top">
              <span className="method-badge">GET</span>

              <code>
                /{endpoint.id}/{resourceId}
              </code>
            </div>

            <h1>
              {endpoint.name} #{resourceId}
            </h1>

            <p>Individual resource response from DummyJSON.</p>
          </div>
        </section>

        {loading && <LoadingState />}

        {!loading && error && (
          <div className="error-state detail-error">
            <p>{error}</p>

            <Link to={`/${endpoint.id}`} className="button button-primary">
              Back to results
            </Link>
          </div>
        )}

        {!loading && !error && data && (
          <section className="detail-grid">
            <div className="detail-main">
              <div className="detail-toolbar">
                <div>
                  <p className="section-eyebrow">RESPONSE</p>

                  <h2>Resource #{resourceId}</h2>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="button button-secondary"
                >
                  <Copy className="size-4" />
                  {copied ? "Copied" : "Copy JSON"}
                </button>
              </div>

              <div className="detail-content">
                <ResourceDetails data={data} type={endpoint.id} />
              </div>
            </div>

            <aside className="raw-response">
              <div className="raw-response-header">
                <div>
                  <p className="section-eyebrow">RAW JSON</p>

                  <h3>Response body</h3>
                </div>

                <a
                  href={`https://dummyjson.com/${endpoint.id}/${resourceId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-button"
                  title="Open raw response"
                >
                  <ExternalLink className="size-4" />
                </a>
              </div>

              <pre>{JSON.stringify(data, null, 2)}</pre>
            </aside>
          </section>
        )}
      </div>
    </main>
  );
}

function ResourceDetails({
  data,
  type,
}: {
  data: Record<string, unknown>;
  type: string;
}) {
  if (type === "products") {
    return (
      <>
        {typeof data.thumbnail === "string" && (
          <img
            src={data.thumbnail}
            alt={String(data.title)}
            className="detail-image"
          />
        )}

        <div className="detail-info">
          <span className="resource-badge">{String(data.category)}</span>

          <h2>{String(data.title)}</h2>

          <p>{String(data.description)}</p>

          <div className="detail-stats">
            <Stat label="Price" value={`$${Number(data.price).toFixed(2)}`} />

            <Stat
              label="Rating"
              value={`★ ${Number(data.rating).toFixed(1)}`}
            />

            <Stat label="Stock" value={String(data.stock)} />
          </div>
        </div>
      </>
    );
  }

  if (type === "users") {
    return (
      <div className="detail-info">
        {typeof data.image === "string" && (
          <img
            src={data.image}
            alt={`${data.firstName} ${data.lastName}`}
            className="detail-avatar"
          />
        )}

        <h2>
          {String(data.firstName)} {String(data.lastName)}
        </h2>

        <p>{String(data.email)}</p>

        <div className="detail-list">
          <DetailRow label="Username" value={String(data.username)} />

          <DetailRow label="Age" value={String(data.age)} />

          <DetailRow label="Gender" value={String(data.gender)} />

          <DetailRow label="Phone" value={String(data.phone)} />
        </div>
      </div>
    );
  }

  if (type === "quotes") {
    return (
      <div className="detail-info quote-detail">
        <p className="quote-text">“{String(data.quote)}”</p>

        <p className="quote-author">— {String(data.author)}</p>
      </div>
    );
  }

  return (
    <div className="detail-list">
      {Object.entries(data)
        .filter(([, value]) => typeof value !== "object")
        .map(([key, value]) => (
          <DetailRow key={key} label={key} value={String(value)} />
        ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
