const initialState = {
    filteredRecords: [],
    status: 'all',
    records: [],
}
const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_STATUS':
            return {
                ...state,
                status: action.payload,
            };
        case 'SET_RECORDS':
            return {
                ...state,
                records: action.payload,
            }
        case 'SET_FILTERED_RECORDS':
            return {
                ...state,
                filteredRecords: action.payload,
            }
        case 'DELETE_RECORD':
            let filterIndex = state.filteredRecords.findIndex(function (dum) {
                return dum['id'] === action.payload.id
            })
            let index = state.records.findIndex(function (dum) {
                return dum['id'] === action.payload.id
            });
            state.filteredRecords.splice(filterIndex, 1);
            state.records.splice(index, 1);
            return {
                ...state,
                records: [...state.records],
                filteredRecords: [...state.filteredRecords],
            }
        case 'UPDATE_STATUS':
            let updatefilterIndex = state.filteredRecords.findIndex(function (dum) {
                return dum['id'] === action.payload.record.id
            })
            let updateFilterRecord = state.filteredRecords[updatefilterIndex];
            updateFilterRecord['status'] = action.payload.status;
            updateFilterRecord['updated_at'] = new Date()
            state.filteredRecords.splice(updatefilterIndex, 1, updateFilterRecord);
            var updateIndex = state.records.findIndex(function (dum) {
                return dum['id'] === action.payload.record.id
            });
            let updateRecord = state.records[updateIndex];
            updateRecord['status'] = action.payload.status;
            updateRecord['updated_at'] = new Date()
            state.records.splice(updateIndex, 1, updateRecord);
            return {
                ...state,
                records: [...state.records],
                filteredRecords: [...state.filteredRecords],
            }
        default:
            return state;
    }
}

export default rootReducer;