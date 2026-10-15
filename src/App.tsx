import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import EndpointPage from "./pages/EndpointPage";
import Home from "./pages/Home";
import ResourceDetailPage from "./pages/ResourceDetailPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/:endpointId" element={<EndpointPage />} />

        <Route
          path="/:endpointId/:resourceId"
          element={<ResourceDetailPage />}
        />
      </Routes>
    </div>
  );
}
