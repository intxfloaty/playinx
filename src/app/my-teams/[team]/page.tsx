import React from "react";

const page = ({ params }: { params: { team: string } }) => {
  return <div style={{color: "white"}}>{params.team}</div>;
};

export default page;
