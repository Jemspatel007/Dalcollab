import request from "@/lib/axios-config";
import _request from "@/lib/axios-config";
export const getAllProjects = () => async (dispatch) => {
  const request = _request();
  try {
    dispatch({
      type: "ALL_PROJECTS_REQUEST",
    });

    const response = await request.get("/project/projects");

    dispatch({
      type: "ALL_PROJECTS_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
   console.log(error)
  }
};


// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_ERRORS",
  });
};
