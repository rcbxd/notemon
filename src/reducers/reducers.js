import { LOG_IN, LOG_OUT, CHANGE_PAGE_TITLE, LOAD_HOME_PAGE } from '../actions/actions';

const initialState = {
    isLoggedIn: false,
    firstName: "",
    lastName: "",
    pageTitle: "Notemon",
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return {
                isLoggedIn: true,
                firstName: action.firstName,
                lastName: action.lastName,
            };
        case LOG_OUT:
            return {
                isLoggedIn: false,
                firstName: "",
                lastName: ""
            }
        case CHANGE_PAGE_TITLE:
            return {
                pageTitle: action.title
            }
        case LOAD_HOME_PAGE:
            return {
                pageTitle: action.pageTitle,
                firstName: action.firstName,
                lastName: action.lastName,
                isLoggedIn: true
            }
        default:
            return state;
    };
}

export default rootReducer;