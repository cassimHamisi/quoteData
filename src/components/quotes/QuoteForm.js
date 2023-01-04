import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const finishEnteringDataHandler = () => {
    setIsEntering(false);
  };

  const onFocusHandler = (event) => {
    event.preventDefault();
    setIsEntering(true);
  };

  // const onBlurFormHandler = (event) => {
  //   event.preventDefault();
  //   console.log("----Blur-----");
  //   event.target.value && setIsEntering(true);
  //   !event.target.value && setIsEntering(false);
  // };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={() =>
          "Form Not Submitted!! All Data will be lost if you leave this Page"
        }
      />
      <Card>
        <form
          onFocus={onFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
          // onBlur={onBlurFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              rows="5"
              ref={textInputRef}
              style={{ maxWidth: "600px" }}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringDataHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
