export const getGuestId = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("guest_id");
  }
};
export const getToken = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("token");
  }
};