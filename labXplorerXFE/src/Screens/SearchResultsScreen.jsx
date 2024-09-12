import React from "react";
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
    <div className="px-4 sm:px-6 lg:px-12 mb-12">
      <NavBar />
      {isLoading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <div>
          {Object.keys(searchResults).length === 0 ? (
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl italic font-semibold mb-6">
                Couldn't find results for "{searchName}"
              </h1>
              <img
                src="/assets/misc/not-found.svg"
                alt="Not Found"
                className="w-2/3 sm:w-1/2 lg:w-1/4 mx-auto"
              />
            </div>
          ) : (
            <div>
              {searchResults?.simulations && (
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-4">Simulations Result</h1>
                  <SimulationList simulations={searchResults.simulations} />
                </div>
              )}
              {searchResults?.capsules && (
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-4">Capsules Result</h1>
                  {searchResults.capsules.map((capsule) => (
                    <div
                      key={capsule.title}
                      className="flex flex-col sm:flex-row w-full bg-slate-600 mx-auto items-center rounded-lg shadow-lg overflow-hidden mb-4"
                    >
                      <img
                        src={BASE_UPLOAD_URL + capsule.thumbnail}
                        alt={capsule.title}
                        className="w-full sm:w-1/3 h-48 sm:h-60 object-cover"
                      />
                      <div className="w-full sm:w-2/3 p-4">
                        <h2 className="text-xl sm:text-2xl font-bold">{capsule.title}</h2>
                        <p className="text-gray-200 mt-2">{capsule.description}</p>
                        <Link to={"../capsule/" + capsule.id}>
                          <button className="mt-4 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900">
                            Explore
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsScreen;
