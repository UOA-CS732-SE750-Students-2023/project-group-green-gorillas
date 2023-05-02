// import {
//   AvatarGroup,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Chip,
//   Typography,
// } from "@mui/material";
// import { Stack } from "@mui/system";
// import { ActionItem } from "../../../../hooks/useActionItems";
// import { Avatar } from "../../../common/Avatar";

// export const ActionItemList = (
//   {actionListItems}: ActionItem[]
//   //   updateActionItems,
//   //   deleteActionItems
// ) => {
//   return (
//     <Stack spacing={2}>
//       {actionListItems?.map((actionListItem) => (
//         <Card key={actionListItem.id} sx={{ maxWidth: 450 }}>
//           <CardContent>
//             <Typography variant="h6" component="div">
//               {actionListItem.note}
//             </Typography>
//             <Chip label={actionListItem.status} color="success" size="small" />

//             <Typography color="text.secondary" component="div">
//               {actionListItem.createdAt.slice(0, 10)}
//             </Typography>
//             <AvatarGroup max={4}>
//               {actionListItem.assignees?.map((assignee) => (
//                 <Avatar
//                   key={assignee.id}
//                   text={`${assignee.firstName} ${assignee.lastName}`}
//                 />
//               ))}
//             </AvatarGroup>
//           </CardContent>
//           {/* <CardActions>
//           <Button
//             variant="outlined"
//             color="error"
//             size="small"
//             sx={{ marginLeft: "auto" }}
//             // disabled={true}
//             onClick={() => {
//               deleteActionItems(actionItem);
//             }}
//           >
//             DELETE
//           </Button>
//           <Button
//             variant="contained"
//             size="small"
//             onClick={() => {
//               updateActionItems(actionItem);
//             }}
//             sx={{ marginLeft: "auto" }}
//           >
//             Complete
//           </Button>
//         </CardActions> */}
//         </Card>
//       ))}
//     </Stack>
//   );
// };
