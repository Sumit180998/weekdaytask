import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDatass = createAsyncThunk('WorkdayApi', async (offset) => {
    console.log(offset);
    const requestData = {
        limit: 10,
        offset: offset
    };

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', requestData, config);
    return response.data; // Return data from the response, not the entire response object
});

export const initialState = {
    value: [],
    total_count: 0,
    checkdata:[]
};

export const slice = createSlice({
    name: "workday",
    initialState,
    reducers: {}, // You can define additional reducers here if needed
    extraReducers: (builder) => {
        builder.addCase(fetchDatass.fulfilled, (state, action) => {
            // Check if the data already exists in state
            console.log(action.payload.jdList)
            
            state.value = [...state.value, ...action.payload.jdList];
            state.total_count = action.payload.totalCount;
            state.checkdata=action.payload.jdList
        });
    }
});

export default slice.reducer;
