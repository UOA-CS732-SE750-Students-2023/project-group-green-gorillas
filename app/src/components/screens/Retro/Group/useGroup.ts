import { v4 } from "uuid";

function moveCol(columns: any, source: any, dest: any) {
  const sourceCol = columns[source.droppableId];
  const destCol = columns[dest.droppableId];
  const sourceItems = [...sourceCol.items];
  const destItems = [...destCol.items];
  const [removed] = sourceItems.splice(source.index, 1);
  destItems.splice(dest.index, 0, removed);

  return {
    ...columns,
    [dest.droppableId]: {
      ...destCol,
      items: destItems,
    },
    [source.droppableId]: {
      ...sourceCol,
      items: sourceItems,
    },
  };
}

function sameCol(columns, source, destIndex) {
  const sourceCol = columns[source.droppableId];
  const sourceItems = [...sourceCol.items];
  const [removed] = sourceItems.splice(source.index, 1);
  sourceItems.splice(destIndex, 0, removed);

  return {
    ...columns,
    [source.droppableId]: {
      ...sourceCol,
      items: sourceItems,
    },
  };
}

function newGroupDiffCol(columns, source, combine) {
  const sourceCol = columns[source.droppableId];
  const destCol = columns[combine.droppableId];

  const sourceItems = [...sourceCol.items];
  const destItems = [...destCol.items];
  const destGroups = [...destCol.groups];

  const destIndex = destItems.findIndex((item) => {
    return item.id === combine.draggableId;
  });
  const [removedFromSource] = sourceItems.splice(source.index, 1);
  const [removedFromDest] = destItems.splice(destIndex, 1);

  const newGroup = {
    id: `group-${v4()}`,
    name: "New Group",
    column: combine.droppableId,
    items: [removedFromDest, removedFromSource],
    votes: 0,
  };

  destGroups.push(newGroup);

  return {
    ...columns,
    [combine.droppableId]: {
      ...destCol,
      items: destItems,
      groups: destGroups,
    },
    [source.droppableId]: {
      ...sourceCol,
      items: sourceItems,
    },
  };
}

function newGroupSameCol(columns, source, combine) {
  const sourceCol = columns[source.droppableId];
  const sourceItems = [...sourceCol.items];
  const sourceGroups = [...sourceCol.groups];
  const [toCombine] = sourceItems.splice(source.index, 1);
  const destIndex = sourceItems.findIndex((item) => {
    return item.id === combine.draggableId;
  });
  const [toCombineWith] = sourceItems.splice(destIndex, 1);

  const newGroup = {
    id: `group-${v4()}`,
    name: "New Group",
    column: source.droppableId,
    items: [toCombineWith, toCombine],
    votes: 0,
  };

  sourceGroups.push(newGroup);

  return {
    ...columns,
    [source.droppableId]: {
      ...sourceCol,
      items: sourceItems,
      groups: sourceGroups,
    },
  };
}

function sameGroup(columns, source, dest) {
  let sourceGroup = null;
  let colId = "";
  let groupIndex = 0;
  Object.entries(columns).forEach((col) => {
    col[1].groups.forEach((group, index) => {
      if (group.id === source.droppableId) {
        sourceGroup = group;
        colId = col[0];
        groupIndex = index;
        return;
      }
    });
    if (sourceGroup) return;
  });

  const sourceCol = columns[colId];
  const sourceGroups = [...sourceCol.groups];
  const groupItems = [...sourceGroup.items];
  const [removed] = groupItems.splice(source.index, 1);
  groupItems.splice(dest.index, 0, removed);
  sourceGroup.items = groupItems;
  sourceGroups[groupIndex] = sourceGroup;

  return {
    ...columns,
    [colId]: {
      ...sourceCol,
      groups: sourceGroups,
    },
  };
}

function groupToCol(columns, source, dest) {
  console.log(source, dest);
  let sourceGroup = null;
  let sourceColId = "";
  let sourceGroupIndex = 0;
  Object.entries(columns).forEach((col) => {
    col[1].groups.forEach((group, index) => {
      if (group.id === source.droppableId) {
        sourceGroup = group;
        sourceColId = col[0];
        sourceGroupIndex = index;
        return;
      }
    });
    if (sourceGroup) return;
  });

  const sourceCol = columns[sourceColId];
  const sourceGroups = [...sourceCol.groups];
  const groupItems = [...sourceGroup.items];
  const [removed] = groupItems.splice(source.index, 1);
  sourceGroup.items = groupItems;
  sourceGroups[sourceGroupIndex] = sourceGroup;

  const destCol = columns[dest.droppableId];
  const destItems = [...destCol.items];
  destItems.splice(dest.index, 0, removed);

  return {
    ...columns,
    [sourceColId]: {
      ...sourceCol,
      groups: sourceGroups,
    },
    [dest.droppableId]: {
      ...destCol,
      items: destItems,
    },
  };
}

function colToGroup(columns, source, dest) {
  console.log(source, dest);
  let destGroup = null;
  let destColId = "";
  let destGroupIndex = 0;
  Object.entries(columns).forEach((col) => {
    col[1].groups.forEach((group, index) => {
      if (group.id === dest.droppableId) {
        destGroup = group;
        destColId = col[0];
        destGroupIndex = index;
        return;
      }
    });
    if (destGroup) return;
  });

  const sourceCol = columns[source.droppableId];
  const sourceItems = [...sourceCol.items];
  const [removed] = sourceItems.splice(source.index, 1);

  const destCol = columns[destColId];
  const destGroups = [...destCol.groups];
  const destItems = [...destGroup.items];
  destItems.push(removed);
  destGroup.items = destItems;
  destGroups[destGroupIndex] = destGroup;

  if (source.droppableId === destColId) {
    return {
      ...columns,
      [source.droppableId]: {
        ...sourceCol,
        items: sourceItems,
        groups: destGroups,
      },
    };
  }

  return {
    ...columns,
    [source.droppableId]: {
      ...sourceCol,
      items: sourceItems,
    },
    [destColId]: {
      ...destCol,
      groups: destGroups,
    },
  };
}

function groupToGroup(columns, source, dest) {
  let sourceGroup = null;
  let sourceColId = "";
  let sourceGroupIndex = 0;
  let destGroup = null;
  let destColId = "";
  let destGroupIndex = 0;
  Object.entries(columns).forEach((col) => {
    col[1].groups.forEach((group, index) => {
      if (group.id === source.droppableId) {
        sourceGroup = group;
        sourceColId = col[0];
        sourceGroupIndex = index;
      } else if (group.id === dest.droppableId) {
        destGroup = group;
        destColId = col[0];
        destGroupIndex = index;
      }
    });
  });

  const sourceCol = columns[sourceColId];
  const sourceGroups = [...sourceCol.groups];
  const groupItems = [...sourceGroup.items];
  const [removed] = groupItems.splice(source.index, 1);
  sourceGroup.items = groupItems;
  sourceGroups[sourceGroupIndex] = sourceGroup;

  const destCol = columns[destColId];
  const destGroups = [...destCol.groups];
  const destItems = [...destGroup.items];
  destItems.push(removed);
  destGroup.items = destItems;
  destGroups[destGroupIndex] = destGroup;

  return {
    ...columns,
    [sourceColId]: {
      ...sourceCol,
      groups: sourceGroups,
    },
    [destColId]: {
      ...destCol,
      groups: destGroups,
    },
  };
}

export function onDragEnd(columns, result) {
  console.log(result);
  let newColumns = columns;

  /* If being moved to a diff col/group */
  if (!!result.destination) {
    const { source, destination: dest } = result;

    /* Return if position and col/group are the same */
    if (source.droppableId === dest.droppableId && source.index === dest.index)
      return newColumns;

    /* Group logic */
    if (
      source.droppableId.includes("group") ||
      dest.droppableId.includes("group")
    ) {
      if (source.droppableId === dest.droppableId) {
        console.log("Same Group");
        newColumns = sameGroup(columns, source, dest);
      } else if (
        source.droppableId.includes("group") &&
        !dest.droppableId.includes("group")
      ) {
        console.log("Group to Col");
        newColumns = groupToCol(columns, source, dest);
      } else if (
        !source.droppableId.includes("group") &&
        dest.droppableId.includes("group")
      ) {
        newColumns = colToGroup(columns, source, dest);
      } else {
        newColumns = groupToGroup(columns, source, dest);
      }
    } else {
      if (source.droppableId !== dest.droppableId) {
        console.log("Move Col");
        newColumns = moveCol(columns, source, dest);
      } else {
        console.log("Same Col");
        newColumns = sameCol(columns, source, dest.index);
      }
    }
  }

  if (!!result.combine) {
    const { source, combine } = result;

    if (source.droppableId.includes("group")) return newColumns;

    /* Different columns */
    if (source.droppableId !== combine.droppableId) {
      console.log("New Group Diff Col");
      newColumns = newGroupDiffCol(columns, source, combine);
    } else {
      console.log("New Group Same Col");
      console.log(result);
      newColumns = newGroupSameCol(columns, source, combine);
    }
  }

  return newColumns;
}
