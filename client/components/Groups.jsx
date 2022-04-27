import React, { useEffect, useState } from "react";
import { getGroups } from "../api/groups";

//Component import
import GroupsItems from "./GroupsItems";

function PastGroups() {
  //local state is only used for testing the API route's mock data, will use redux when its setup
  const [group, setGroup] = useState([]);

  useEffect(() => {
    getGroups()
      .then((group) => setGroup(group))
      .catch((err) => console.error(err));
  }, []);

  return group.map((group, i) => (
    <GroupsItems key={i} groupName={group.groupName} count={group.count} />
  ));
}

export default PastGroups;
