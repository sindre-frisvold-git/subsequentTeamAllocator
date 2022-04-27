import React from "react";
import Header from "./elements/Header";
import PastGroups from "./Groups";
import CreateGroup from "./elements/CreateGroup";

function Home() {
  return (
    <>
      <Header headerName="FRIDAY PROJECTS" />
      <CreateGroup />
      <PastGroups />
    </>
  );
}

export default Home;
