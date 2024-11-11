import React, { useState } from "react";
function Home(props) {
  const [leaveCount, setLeaveCount] = useState(0);
  return (
    <div className="row">
      <h1 className="text-center pt-4">Dashboard</h1>
      <hr />

      <div className="col-12 text-center">
        <h1 className="display-1">{leaveCount}</h1>
        <h1 className="display-3">Total Leaves Applied</h1>
      </div>
    </div>
  );
}
export default Home;
