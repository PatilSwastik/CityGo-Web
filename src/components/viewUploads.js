import React from "react";

function ViewUploads() {
  return (
    <section className="bg-gray-200 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <div className="flex justify-center items-center w-full sm:w-auto">
            <img
              src="https://via.placeholder.com/500x600"
              alt="Placeholder Photo 1"
              width="500"
              height="600"
            />
          </div>
          <div className="flex justify-center items-center w-full sm:w-auto">
            <img
              src="https://via.placeholder.com/500x600"
              alt="Placeholder Photo 2"
              width="500"
              height="600"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewUploads;
