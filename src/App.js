import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
// import AllQuote from "./pages/AllQuote";
// import NewQuote from "./pages/NewQuote";
// import NotFoundPage from "./pages/NotFoundPage";
// import QuoteDetail from "./pages/QuoteDetail";

const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const Layout = React.lazy(() => import("./components/layout/Layout"));
const AllQuote = React.lazy(() => import("./pages/AllQuote"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/quotes" />
            </Route>
            <Route path="/quotes" exact>
              <AllQuote />
            </Route>
            <Route path="/quotes/:quoteId">
              <QuoteDetail />
            </Route>
            <Route path="/new-quote">
              <NewQuote />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Layout>
      </Suspense>
    </div>
  );
}

export default App;
