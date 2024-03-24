import React from "react";
import { SearchResult } from "./SearchResult";

export const SearchResults = ({ results }) => {
    console.log(results);
  return (
    <>
      <div className={results.length >0 ? "display-flex" : "display-none"}>
        <div className="results-wrapper">
          <div className="results-list">
            {results?.map((result, id) => {
              return <SearchResult result={result} key={id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
