import React from "react";

function GroupsItems(props) {
  return (
    <>
      <p>{props.groupName}</p>
      <p>{props.count}</p>
    </>
  );
}

export default GroupsItems;
