import React from "react";
import { Droppable } from "react-beautiful-dnd";
import GroupNote from "./GroupNote";
import stageStyles from "../styles/stage.module.css";
import styles from "../styles/styles.module.css";

import { useState } from "react";
import Group from "./Group";
import { Box } from "@mui/material";

function GroupColumn({ id, column, setGroupName }: any) {
  return (
    <Box className={stageStyles.column}>
      <Box className={stageStyles.column__header}>
        <div>
          <Box className={styles.select__heading}>{column.shortDesc}</Box>
          <Box className={styles.heading}>{column.name}</Box>
        </div>
      </Box>
      {column.groups.map((group, index) => (
        <Group
          colId={id}
          id={group.id}
          index={index}
          items={group.items}
          key={group.id}
          setGroupName={setGroupName}
          name={group.name}
        />
      ))}
      <Droppable droppableId={id} isCombineEnabled>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ height: "100%" }}
            >
              {column.items.map((item, index) => (
                <GroupNote
                  id={item.id}
                  index={index}
                  note={item}
                  key={item.id}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </Box>
  );

  /*
	return (
		<Droppable droppableId={id} isCombineEnabled>
			{(provided, snapshot) => {
				return (
					<div
						className='column'
					>
						<div className="column__header">
							<div>
								<div className="select__heading">{column.shortDesc}</div>
								<div className="heading">{column.name}</div>
							</div>
						</div>
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							style={{height: '100%'}}
						>
							{column.items.map((item, index) => (
								item.type === 'note' ? (
									<GroupNote id={item.id} index={index} note={item} key={item.id} />
								) : (
									<Group id={item.id} index={index} items={item.items} key={item.id} />
								)
							))}
						</div>
						{provided.placeholder}
					</div>
				)
			}}
		</Droppable>
	); */
}

export default GroupColumn;
