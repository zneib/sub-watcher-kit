export const handleClickOutside = (event: MouseEvent | KeyboardEvent, dialog: HTMLDialogElement) => {
  if (event?.target?.nodeName === "DIALOG") {
    dialog.close();
  }
}