import React, { Suspense, useEffect } from "react";
import {
  NavLink,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
// import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const Comments = React.lazy(() => import("../components/comments/Comments"));

const QuoteDetail = () => {
  const match = useRouteMatch();
  const param = useParams();
  const location = useLocation();
  let show = true;

  if (location.pathname.slice(8) === `${param.quoteId}/comments`) {
    show = false;
  }

  const { quoteId } = param;
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getSingleQuote);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }
  if (!loadedQuotes) {
    return <h1 style={{ color: "red" }}>No Quote Found</h1>;
  }
  console.log(Comments);

  return (
    <section>
      <Suspense fallback={<p>Sending</p>}>
        {show && (
          <HighlightedQuote
            text={loadedQuotes.text}
            author={loadedQuotes.author}
          />
        )}
        <div className="centered">
          {show && (
            <NavLink
              className="btn--flat"
              to={`${match.path}${param.quoteId}/comments`}
              exact
            >
              Add Comments
            </NavLink>
          )}
        </div>
        <Route path={`${match.path}/comments`}>
          <div className="centered">
            <h1> Quote Details</h1>
          </div>
          <Comments />
        </Route>
      </Suspense>
    </section>
  );
};
export default QuoteDetail;
