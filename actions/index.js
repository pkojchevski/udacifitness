export const RECEIVE_ENTRRIES = "RECEIVE_ENTRRIES"
export const ADD_ENTRY = "ADD_ENTRY"

export const addEntry = (entry) => ({
    type:ADD_ENTRY,
    entry
})

export const receiveEntries = (entries) => ({
    type:RECEIVE_ENTRY,
    entries
})

