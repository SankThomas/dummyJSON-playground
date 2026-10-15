import {
  BookOpen,
  CheckSquare,
  MessageCircle,
  Quote,
  ShoppingBag,
  ShoppingCart,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export type EndpointType =
  | "products"
  | "users"
  | "posts"
  | "comments"
  | "carts"
  | "quotes"
  | "todos"
  | "recipes";

export interface Endpoint {
  id: EndpointType;
  name: string;
  description: string;
  path: string;
  icon: LucideIcon;
  color: string;
  image: string;
  searchable: boolean;
  sortOptions: {
    label: string;
    value: string;
  }[];
}

export const endpoints: Endpoint[] = [
  {
    id: "products",
    name: "Products",
    description: "Explore products, prices, categories, ratings and inventory.",
    path: "/products",
    icon: ShoppingBag,
    color: "endpoint-blue",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    searchable: true,
    sortOptions: [
      { label: "Title", value: "title" },
      { label: "Price", value: "price" },
      { label: "Rating", value: "rating" },
    ],
  },
  {
    id: "users",
    name: "Users",
    description: "Browse profiles, contact information and user accounts.",
    path: "/users",
    icon: Users,
    color: "endpoint-violet",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    searchable: true,
    sortOptions: [
      { label: "First name", value: "firstName" },
      { label: "Last name", value: "lastName" },
      { label: "Age", value: "age" },
    ],
  },
  {
    id: "posts",
    name: "Posts",
    description: "Fetch posts with authors, tags, reactions and views.",
    path: "/posts",
    icon: BookOpen,
    color: "endpoint-orange",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
    searchable: true,
    sortOptions: [
      { label: "Title", value: "title" },
      { label: "Views", value: "views" },
    ],
  },
  {
    id: "comments",
    name: "Comments",
    description: "Work with comments and their associated posts and users.",
    path: "/comments",
    icon: MessageCircle,
    color: "endpoint-pink",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    searchable: true,
    sortOptions: [{ label: "Likes", value: "likes" }],
  },
  {
    id: "carts",
    name: "Carts",
    description: "Inspect shopping carts, quantities and order totals.",
    path: "/carts",
    icon: ShoppingCart,
    color: "endpoint-green",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80",
    searchable: false,
    sortOptions: [],
  },
  {
    id: "quotes",
    name: "Quotes",
    description: "Discover quotes and their authors from the API.",
    path: "/quotes",
    icon: Quote,
    color: "endpoint-yellow",
    image:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80",
    searchable: true,
    sortOptions: [{ label: "Author", value: "author" }],
  },
  {
    id: "todos",
    name: "Todos",
    description: "Explore tasks, completion status and users.",
    path: "/todos",
    icon: CheckSquare,
    color: "endpoint-cyan",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=80",
    searchable: true,
    sortOptions: [
      { label: "Todo", value: "todo" },
      { label: "User ID", value: "userId" },
    ],
  },
  {
    id: "recipes",
    name: "Recipes",
    description: "Browse recipes, ingredients, cuisines and meal types.",
    path: "/recipes",
    icon: Utensils,
    color: "endpoint-red",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80",
    searchable: true,
    sortOptions: [
      { label: "Name", value: "name" },
      { label: "Rating", value: "rating" },
      { label: "Difficulty", value: "difficulty" },
    ],
  },
];
