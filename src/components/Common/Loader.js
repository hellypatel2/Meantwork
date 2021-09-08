import React from "react";
// import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader() {
  return (
    <div>
      <div className="container">
        <div className="flex justify-center items-center h-screen">
          <div className="w-1/4 text-center">
            {/* <img src={require("../../images/with-network-logo.png").default} /> */}
            {/* <CircularProgress className="mt-3" /> */}
            Loading ...
          </div>
        </div>
      </div>
    </div>
  );
}
