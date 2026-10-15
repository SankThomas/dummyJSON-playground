import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import ResourceCard from "../components/ResourceCard";
import { endpoints } from "../data/endpoints";
import { fetchResource } from "../lib/api";

interface ApiResponse {
  [key: string]: unknown;
  total: number;
  skip: number;
  limit: number;
}

export default function EndpointPage() {
  const { endpointId } = useParams();

  const endpoint = endpoints.find((item) => item.id === endpointId);

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();

        searchRef.current?.focus();
        setShowFilters(true);
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const loadData = useCallback(async () => {
    if (!endpoint) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetchResource(endpoint.id, {
        limit: 12,
        skip,
        search,
        sortBy,
        order,
      });

      setData(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to fetch the endpoint.",
      );
    } finally {
      setLoading(false);
    }
  }, [endpoint, skip, search, sortBy, order]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  const Icon = endpoint.icon;

  const resourceItems = Array.isArray(data?.[endpoint.id])
    ? (data?.[endpoint.id] as Record<string, unknown>[])
    : [];

  const total = data?.total ?? 0;
  const limit = data?.limit ?? 12;

  const hasPrevious = skip > 0;
  const hasNext = skip + limit < total;

  const handleSearch = () => {
    setSkip(0);
    setSearch(searchInput);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
    setSkip(0);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setSkip(0);
  };

  return (
    <main className="endpoint-page">
      <div className="page-container">
        <Link to="/" className="back-link">
          <ArrowLeft className="size-4" />
          All endpoints
        </Link>

        <section className="endpoint-header">
          <div className={`endpoint-header-icon ${endpoint.color}`}>
            <Icon className="size-6" />
          </div>

          <div className="endpoint-header-content">
            <div className="endpoint-header-top">
              <span className="method-badge">GET</span>

              <code>dummyjson.com/{endpoint.id}</code>
            </div>

            <h1>{endpoint.name}</h1>

            <p>{endpoint.description}</p>
          </div>

          <a
            href={`https://dummyjson.com/${endpoint.id}`}
            target="_blank"
            rel="noreferrer"
            className="icon-button"
            title="Open endpoint"
          >
            <ExternalLink className="size-4" />
          </a>
        </section>

        <section className="data-section">
          <div className="data-toolbar">
            <div>
              <p className="section-eyebrow">API RESPONSE</p>

              <h2>{loading ? "Loading..." : `${total} results`}</h2>
            </div>

            <div className="toolbar-actions">
              <button
                type="button"
                onClick={() => setShowFilters((value) => !value)}
                className="button button-secondary"
              >
                <SlidersHorizontal className="size-4" />
                Filters
              </button>

              <button
                type="button"
                onClick={loadData}
                disabled={loading}
                className="button button-secondary"
              >
                <RefreshCw
                  className={`size-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="filter-panel">
              {endpoint.searchable && (
                <div className="search-field">
                  <label htmlFor="resource-search">Search</label>

                  <div className="search-input">
                    <Search className="size-4" />

                    <input
                      ref={searchRef}
                      id="resource-search"
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSearch();
                        }

                        if (event.key === "Escape") {
                          searchRef.current?.blur();
                        }
                      }}
                      placeholder={`Search ${endpoint.name.toLowerCase()}...`}
                    />

                    <div className="search-shortcut">/</div>

                    {searchInput && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="search-clear"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {endpoint.sortOptions.length > 0 && (
                <div className="sort-fields">
                  <div className="filter-field">
                    <label htmlFor="sort">Sort by</label>

                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(event) => handleSortChange(event.target.value)}
                    >
                      <option value="">Default</option>

                      {endpoint.sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-field">
                    <label htmlFor="order">Order</label>

                    <select
                      id="order"
                      value={order}
                      onChange={(event) => {
                        setOrder(event.target.value as "asc" | "desc");
                        setSkip(0);
                      }}
                    >
                      <option value="asc">Ascending</option>

                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>
              )}

              {search && (
                <div className="active-filter">
                  <Filter className="size-3.5" />
                  Searching for "{search}"
                  <button type="button" onClick={clearSearch}>
                    Clear
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="request-bar">
            <span>REQUEST</span>

            <code>
              GET /{endpoint.id}
              {search ? `/search?q=${encodeURIComponent(search)}` : ""}
              {!search && sortBy ? `?sortBy=${sortBy}&order=${order}` : ""}
            </code>
          </div>

          {loading && <LoadingState />}

          {!loading && error && (
            <div className="error-state">
              <p>{error}</p>

              <button
                type="button"
                onClick={loadData}
                className="button button-primary"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && resourceItems.length === 0 && (
            <div className="empty-state">
              <Search className="size-7" />

              <h3>No results found</h3>

              <p>Try a different search term.</p>

              <button
                type="button"
                onClick={clearSearch}
                className="button button-secondary"
              >
                Clear search
              </button>
            </div>
          )}

          {!loading && !error && resourceItems.length > 0 && (
            <>
              <div
                className={`resource-grid ${
                  endpoint.id === "users" || endpoint.id === "todos"
                    ? "resource-grid-compact"
                    : ""
                }`}
              >
                {resourceItems.map((item) => (
                  <ResourceCard
                    key={String(item.id)}
                    item={item}
                    type={endpoint.id}
                  />
                ))}
              </div>

              <div className="pagination">
                <button
                  type="button"
                  disabled={!hasPrevious}
                  onClick={() =>
                    setSkip((current) => Math.max(0, current - limit))
                  }
                  className="pagination-button"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </button>

                <span>
                  {skip + 1}–{Math.min(skip + limit, total)} of {total}
                </span>

                <button
                  type="button"
                  disabled={!hasNext}
                  onClick={() => setSkip((current) => current + limit)}
                  className="pagination-button"
                >
                  Next
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </>
          )}
        </section>

        <section className="more-section">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">KEEP EXPLORING</p>

              <h2>Other endpoints</h2>
            </div>
          </div>

          <div className="endpoint-grid">
            {endpoints
              .filter((item) => item.id !== endpoint.id)
              .slice(0, 3)
              .map((item) => {
                const Icon = item.icon;

                return (
                  <Link key={item.id} to={item.path} className="mini-endpoint">
                    <div className={`mini-endpoint-icon ${item.color}`}>
                      <Icon className="size-4" />
                    </div>

                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.path}</p>
                    </div>

                    <ChevronRight className="size-4" />
                  </Link>
                );
              })}
          </div>
        </section>
      </div>
    </main>
  );
}
