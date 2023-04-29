import React, { useState } from "react";
import VoteColumn from "./VoteColumn";
import stageStyles from "../styles/stage.module.css";
import { Box } from "@mui/material";

function Vote({ retro, groups, setDiscItems }: any) {
  const [items, setItems] = useState(() => {
    let getItems = [];
    Object.entries(groups).forEach((group) => {
      group[1].groups.forEach((g) => getItems.push(g));
      group[1].items.forEach((item) => getItems.push(item));
    });
    setDiscItems(getItems);
    return getItems;
  });

  function setVotes(fn, id) {
    let index = items.findIndex((item) => item.id === id);
    let newItems = [...items];
    if (fn === "add") {
      newItems[index].votes = newItems[index].votes + 1;
    } else {
      newItems[index].votes = newItems[index].votes - 1;
    }
    setItems(newItems);
    newItems.sort((a, b) => {
      return b.votes - a.votes;
    });
    console.log(newItems);
    setDiscItems(newItems);
  }

  return (
    <Box className={stageStyles.columns__wrapper}>
      {retro.columns.map((column) => (
        <VoteColumn
          title={column.name}
          desc={column.shortDesc}
          items={items}
          setVotes={setVotes}
        />
      ))}
    </Box>
  );
}

export default Vote;
