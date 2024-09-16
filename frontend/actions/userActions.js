import _request from "@/lib/axios-config";
import axios from "axios";
import { use } from "react";
  
//Login
export const login = (user) => async (dispatch) => {
  const request = _request();
  try {
    dispatch({ type: "LOGIN_USER_REQUEST" });

    console.log(user)

    const { data } = await request.post(`auth/login`, user);

    console.log("indidjfakjdf");
    console.log(user);

      dispatch({
        type: "LOGIN_USER_SUCCESS",
        payload: data.user,
      });

      localStorage.setItem("accessToken", data.accessToken);


  } catch (error) {
    dispatch({
      type: "LOGIN_USER_FAIL",
      payload: error.response,
    });
  }
};

//Register
export const register = (user) => async (dispatch) => {
  const request = _request();
  try {
    dispatch({
      type: "REGISTER_USER_REQUEST",
    });

    const { data } = await request.post(`auth/register`, user);

      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: data.user,
      });
      
      localStorage.setItem("accessToken", data.accessToken);

      const email = user.email;

      const lambdaResponse = await axios.post('arn:aws:lambda:us-east-1:297323627892:function:sendSubscription', {
        email
      });
  
      console.log('Lambda response:', lambdaResponse.data);

  } catch (error) {
    console.log(error)
  }
  //   dispatch({
  //     type: "REGISTER_USER_FAIL",
  //     payload: error.response.data.message,
  //   });
  // }
};

//Update Profile
export const updateProfile = (user) => async(dispatch) => {
  const request = _request();

  try {
    dispatch({
      type: "UPDATE_PROFILE_REQUEST",
    });

    const header = { headers: { 
      'Content-Type': 'multipart/form-data',  
    }}
    
    const { data } = await request.post(`http://api/v1/profile/update`, user, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
    
    dispatch({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: true,
    });

  } catch (error) {
    console.log(error)
    dispatch({
      type: "UPDATE_PROFILE_FAIL",
      payload: error.response.data.error,
    });
  }
}

export const updateInterests = (interests) =>  async(dispatch) => {
  const request = _request();
  try {
    dispatch({
      type: "UPDATE_PROFILE_REQUEST",
    });

    console.log(interests)
    const { data } = await request.put(`/profile/addinterests`, interests);
    
    dispatch({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: true,
    });

  } catch (error) {
    console.log(error)
    dispatch({
      type: "UPDATE_PROFILE_FAIL",
      payload: error.response.data.error,
    });
  }
}

export const updateSkills = (skills) =>  async(dispatch) => {
  const request = _request();
  try {
    dispatch({
      type: "UPDATE_PROFILE_REQUEST",
    });

    // console.log(skills)
    const { data } = await request.put(`/profile/addskills`, skills);
    
    dispatch({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: true,
    });

  } catch (error) {
    console.log(error)
    dispatch({
      type: "UPDATE_PROFILE_FAIL",
      payload: error.response.data.error,
    });
  }
}

export const addProject = (project,user) => async (dispatch) => {
  const request = _request();
  try {
    dispatch({
      type: "ADD_PROJECT_REQUEST",
    });
    console.log("IN DISPATCH");
    console.log(project);
    console.log(user)
    console.log("User Printed")
    console.log(user.email);
    const response = await request.post("/profile/addproject", project);

    const userList = await request.get(`/profile/emails?email=${encodeURIComponent(user.email)}`);
  
    console.log(project);
    const { name, description,githubRepoLink} = project;
    const projectForNotification = { name, description, githubRepoLink};

    await axios.post('arn:aws:lambda:us-east-1:297323627892:function:sendNotificationProject',{project: projectForNotification,
      userList: userList.data,});

    console.log(userList);
    dispatch({
      type: "ADD_PROJECT_SUCCESS",
      payload: response.data, 
    });

  } catch (error) {

    dispatch({
      type: "ADD_PROJECT_FAIL",
      payload: error.response.data.error,
    });
  }
};

export const updateProject = (project) =>  async(dispatch) => {
  const request = _request();
  try {
    dispatch({
      type: "UPDATE_PROFILE_REQUEST",
    });

    console.log(project)
    const { data } = await request.put(`/profile/updateproject`, project);
    
    dispatch({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: true,
    });

  } catch (error) {
    console.log(error)
    dispatch({
      type: "UPDATE_PROFILE_FAIL",
      payload: error.response.data.error,
    });
  }
}

//Load user
export const loadUser = () => async (dispatch) => {
  const request = _request();
  try{
    dispatch({
      type: "LOAD_USER_REQUEST"
    })

    const {data} = await request.get(`/profile/me`);

    dispatch({
      type: "LOAD_USER_SUCCESS",
      payload: data.user
    })

  }catch(error){
    console.log(error)
    dispatch({
      type: "LOAD_USER_FAIL",
      payload: error.message
    })
  }
}

//Logout
export const logout = () => async (dispatch) => {
  const request = _request();
  try {
    dispatch({
      type: "LOGOUT_REQUEST"
    })

    localStorage.removeItem("accessToken")

    dispatch({
      type: "LOGOUT_SUCCESS"
    })

  } catch (error) {
    dispatch({
      type: "LOGOUT_FAIL",
      payload: "Logout request failed"
    })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
      type: "CLEAR_ERRORS"
  })
}