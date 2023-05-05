import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
  <DialogTitle>Edit</DialogTitle>
  <DialogContent>
    {/* Insert your form components here */}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
    <Button onClick={handleUpdate}>Update</Button>
  </DialogActions>
</Dialog>
function setOpenDialog(arg0: boolean) {
    throw new Error("Function not implemented.");
}

