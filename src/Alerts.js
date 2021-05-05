import Swal from "sweetalert2";

export const confirm = (confirmTitle, confirmMsg, next) => {
  Swal.fire({
    title: confirmTitle,
    text: confirmMsg,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancelar",
  }).then(next);
};

export const message = (title, message, icon) => {
  Swal.fire({
    type: icon,
    title: title,
    text: message,
  });
};
