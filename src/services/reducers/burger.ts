import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState } from '../initialState';

import { api } from '../../components/api';

export const getIngredients = createAsyncThunk('burger/getIngredients', async () => {
    return api.getIngredients();
});

const slice = createSlice({
    name: 'burger',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                return {
                    ...state,
                    ingredientsRequest: true,
                };
            })
            .addCase(getIngredients.fulfilled, (state, { payload: res }) => {
                return {
                    ...state,
                    ingredientsRequest: false,
                    ingredients: res.data,
                };
            })
            .addCase(getIngredients.rejected, (state) => {
                return {
                    ...state,
                    ingredientsRequest: false,
                    ingredientsFailed: true,
                };
            });
    },
});

const { reducer } = slice;

export { reducer };
