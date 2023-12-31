import React, { useEffect } from "react";
import "./voteAvarage.css";

const VoteAvarage = (SectionData) => {
    const votes = SectionData.votes



  return (
    <div className="RatedVotes">
      <h3>{votes.toFixed(1)}</h3>
    </div>
  );
};

export default VoteAvarage
