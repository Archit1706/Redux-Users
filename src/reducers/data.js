const initialState = {
    data: []
};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_DATA':
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}
