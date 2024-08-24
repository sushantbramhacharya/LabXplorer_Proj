import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import { useSearchByNameQuery } from "../api/miscApi";
import { useParams, Link } from "react-router-dom";
import SimulationList from "../Components/Admin/Simulations";
import { BASE_UPLOAD_URL } from "../constants";

const SearchResultsScreen = () => {
  const { searchName } = useParams();
  const {
    data: searchResults,
    error,
    isLoading,
  } = useSearchByNameQuery({ qryName: searchName });
  return (
    <div className="mx-12 mb-12">
      <NavBar />
      {isLoading ? (
        <>Loading</>
      ) : (
        <>
          {Object.keys(searchResults).length === 0 ? (
            <>
              <h1 className="text-2xl m-12 italic font-semibold">
                Couldnt find Results for "{searchName}"
              </h1>
              <div className="flex justify-center">
                <img
                  src="/assets/misc/not-found.svg"
                  alt="not found"
                  className="w-1/4"
                />
              </div>
            </>
          ) : (
            <>
              {searchResults?.simulations ? (
                <>
                  <h1 className="text-3xl">Simulations Result</h1>
                  <SimulationList simulations={searchResults.simulations} />
                </>
              ) : (
                <></>
              )}
              {searchResults?.capsules ? (
                <>
                  <h1 className="text-3xl mb-6">Capsules Result</h1>
                  {searchResults.capsules.map((capsule) => (
                    <div
                      key={capsule.title}
                      className="flex w-[90vw] bg-slate-600 mx-auto items-center rounded-lg shadow-lg overflow-hidden"
                    >
                      <img
                        src={BASE_UPLOAD_URL + capsule.thumbnail}
                        alt={capsule.title}
                        className="w-1/3 h-60 object-cover"
                      />
                      <div className="w-2/3 p-4 bg-transparent">
                        <h2 className="text-2xl font-bold bg-transparent">
                          {capsule.title}
                        </h2>
                        <p className="text-gray-200 mt-2 bg-transparent">
                          {capsule.description}
                        </p>
                        <Link to={"../capsule/" + capsule.id}>
                          <button className="mt-4 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900">
                            Explore
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultsScreen;
