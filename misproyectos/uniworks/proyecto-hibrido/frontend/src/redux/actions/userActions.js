import axios from "../../axiosConfig";

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get("/users");
    dispatch({
      type: "SET_USERS",
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};

export const setUsers = (users) => {
  return {
    type: "SET_USERS",
    payload: users,
  };
};
