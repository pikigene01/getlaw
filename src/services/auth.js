export const authenticated_user = () => {
  const get_token = localStorage.getItem("auth_token");

  if (get_token != null) {
    return true;
  } else {
    return false;
  }
};
