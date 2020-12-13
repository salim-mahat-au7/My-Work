const initialState = {
    user: {},
    isAuthenticated: false,
    allPosts: [],
    usersPost: [],
    singlePost: {},
    registerLoaderFlag: false,
    postLoaderFlag: false,
    allUsers: [],
    singleUser: {}
}



const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERS_DATA":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case "DELETE_USERS_DATA":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: false
            }
        case "ALL_POSTS":
            return {
                ...state,
                allPosts: action.payload
            }
        case "USERS_POST":
            console.log("asd",action.payload)
            return {
                ...state,
                usersPost: action.payload
            }
        case "SINGLE_POST_DETAILS":
            return {
                ...state,
                singlePost: action.payload
            }
        case "SET_REGISTER_LOADER":
            return {
                ...state,
                registerLoaderFlag: action.payload
            }
        case "SET_POST_UPLOAD_LOADER":
            return {
                ...state,
                postLoaderFlag: action.payload
            }
        case "SET_ALL_USERS":
            return {
                ...state,
                allUsers: action.payload
            }
        case "SET_SINGLE_USER":
            return {
                ...state,
                singleUser: action.payload
            }
        default:
          return state
    }
}

export default userReducer