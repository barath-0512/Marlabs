export const setStatus = (status) => {
    return {
        type: 'SET_STATUS',
        payload: status,
    }
};

export const setRecords = (records) => {
    return {
        type: 'SET_RECORDS',
        payload: records,
    }
};

export const setFilteredRecords = (records) => {
    return {
        type: 'SET_FILTERED_RECORDS',
        payload: records,
    }
};

export const deleteRecord = (recordId) => {
    return { 
        type: 'DELETE_RECORD',
        payload: recordId,
    }
}

export const updateStatus = (record, status) => {
    return { 
        type: 'UPDATE_STATUS',
        payload: {
            record,
            status,
        },
    }
}