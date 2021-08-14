import {
    CREATE_BOOK_REQUEST,
    CREATE_BOOK_SUCCESS,
    CREATE_BOOK_FAIL
} from "../../actions/books/actionTypes";

const createBookReducer = (state = {}, action) => {
    switch (action.Type) {
        case CREATE_BOOK_REQUEST:
            return {
                loading: true,
            };

        case CREATE_BOOK_SUCCESS:
            return {
                BOOK: action.payload,
            };

        case CREATE_BOOK_FAIL:  
            return {
                loading: false,
                error: action.payload
            };

            default:
                return state;
    };
};

export { createBookReducer }