import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ResourceCardProps {
  item: Record<string, unknown>;
  type: string;
}

export default function ResourceCard({ item, type }: ResourceCardProps) {
  const id = String(item.id);

  if (type === "products") {
    return (
      <Link to={`/${type}/${id}`} className="resource-card resource-card-link">
        {typeof item.thumbnail === "string" && (
          <img
            src={item.thumbnail}
            alt={String(item.title)}
            className="resource-image"
          />
        )}

        <div className="resource-content">
          <div className="resource-card-top">
            <span className="resource-badge">{String(item.category)}</span>

            <ArrowUpRight className="size-4 text-slate-400" />
          </div>

          <h3 className="resource-title">{String(item.title)}</h3>

          <p className="resource-description">{String(item.description)}</p>

          <div className="resource-meta">
            <strong>${Number(item.price).toFixed(2)}</strong>

            <span>★ {Number(item.rating).toFixed(1)}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (type === "users") {
    return (
      <Link
        to={`/${type}/${id}`}
        className="resource-card resource-card-row resource-card-link"
      >
        <div className="avatar">
          {String(item.firstName).charAt(0)}
          {String(item.lastName).charAt(0)}
        </div>

        <div className="resource-content">
          <h3 className="resource-title">
            {item.firstName as string} {item.lastName as string}
          </h3>

          <p className="resource-description">{String(item.email)}</p>

          <div className="resource-meta">
            <span>{String(item.company.title)}</span>

            <span>{String(item.age)} years old</span>
          </div>
        </div>
      </Link>
    );
  }

  if (type === "posts") {
    return (
      <Link to={`/${type}/${id}`} className="resource-card resource-card-link">
        <div className="resource-content">
          <div className="resource-card-top">
            <span className="resource-id">POST #{id}</span>

            <ArrowUpRight className="size-4 text-slate-400" />
          </div>

          <h3 className="resource-title">{String(item.title)}</h3>

          <p className="resource-description">{String(item.body)}</p>

          {Array.isArray(item.tags) && (
            <div className="tag-list">
              {item.tags.map((tag) => (
                <span key={String(tag)} className="tag">
                  #{String(tag)}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    );
  }

  if (type === "comments") {
    return (
      <Link to={`/${type}/${id}`} className="resource-card resource-card-link">
        <div className="resource-content">
          <span className="resource-id">COMMENT #{id}</span>

          <p className="quote-text">“{String(item.body)}”</p>

          <div className="resource-meta">
            <span>
              {item.user &&
              typeof item.user === "object" &&
              "fullName" in item.user
                ? String(item.user.fullName)
                : `User #${String(item.userId)}`}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (type === "carts") {
    return (
      <Link to={`/${type}/${id}`} className="resource-card resource-card-link">
        <div className="resource-content">
          <span className="resource-badge">Cart #{id}</span>

          <h3 className="resource-title">User #{String(item.userId)}</h3>

          <div className="cart-stats">
            <div>
              <span>Products</span>
              <strong>{String(item.totalProducts)}</strong>
            </div>

            <div>
              <span>Quantity</span>
              <strong>{String(item.totalQuantity)}</strong>
            </div>

            <div>
              <span>Total</span>
              <strong>${Number(item.total).toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (type === "quotes") {
    return (
      <Link to={`/${type}/${id}`} className="resource-card resource-card-link">
        <div className="resource-content">
          <span className="resource-id">QUOTE #{id}</span>

          <p className="quote-text">“{String(item.quote)}”</p>

          <p className="quote-author">— {String(item.author)}</p>
        </div>
      </Link>
    );
  }

  if (type === "todos") {
    const completed = Boolean(item.completed);

    return (
      <Link to={`/${type}/${id}`} className="resource-card resource-card-link">
        <div className="resource-content">
          <div className="todo-item">
            <div
              className={`todo-check ${completed ? "todo-check-complete" : ""}`}
            >
              {completed && "✓"}
            </div>

            <div>
              <h3
                className={`resource-title ${
                  completed ? "todo-completed" : ""
                }`}
              >
                {String(item.todo)}
              </h3>

              <p className="resource-id">User #{String(item.userId)}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (type === "recipes") {
    return (
      <Link to={`/${type}/${id}`} className="resource-card resource-card-link">
        {typeof item.image === "string" && (
          <img
            src={item.image}
            alt={String(item.name)}
            className="resource-image"
          />
        )}

        <div className="resource-content">
          <span className="resource-badge">{String(item.cuisine)}</span>

          <h3 className="resource-title">{String(item.name)}</h3>

          <div className="resource-meta">
            <span>★ {Number(item.rating).toFixed(1)}</span>

            <span>{String(item.prepTimeMinutes)} min prep</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/${type}/${id}`} className="resource-card resource-card-link">
      <pre className="json-preview">{JSON.stringify(item, null, 2)}</pre>
    </Link>
  );
}
