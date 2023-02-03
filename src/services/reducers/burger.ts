import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '../initialState';

import { api } from '../../components/api';

export const getIngredients = createAsyncThunk('burger/getIngredients', async () => {
    const result = await api.getIngredients();
    if (result.success) {
        return result.data;
    } else {
        console.log(result.error);
    }
});

export const setOrder = createAsyncThunk(
    'burger/setOrder',
    async ({ ingredientIdentifiers }: { ingredientIdentifiers: ingredient['_id'][] }) => {
        const result = await api.setOrder({ ingredientIdentifiers });
        if (result.success) {
            return result;
        } else {
            console.log(result.error);
        }
    },
);

const slice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            return {
                ...state,
                orderFailed: false,
                orderRequest: false,
                currentOrder: null,
            };
        },
        selectIngredient: (state, { payload: ingredient }: PayloadAction<ingredient>) => {
            return {
                ...state,
                currentIngredient: ingredient,
            }
        },
        resetSelectedIngredient: (state) => {
            return {
                ...state,
                currentIngredient: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                return {
                    ...state,
                    ingredientsRequest: true,
                };
            })
            .addCase(getIngredients.fulfilled, (state, { payload: ingredients }: PayloadAction<ingredient[]>) => {
                return {
                    ...state,
                    ingredientsRequest: false,
                    ingredients,
                };
            })
            .addCase(getIngredients.rejected, (state) => {
                return {
                    ...state,
                    ingredientsRequest: false,
                    ingredientsFailed: true,
                };
            });
        builder
            .addCase(setOrder.pending, (state) => {
                return {
                    ...state,
                    orderRequest: true,
                };
            })
            .addCase(setOrder.fulfilled, (state, { payload: data }: PayloadAction<orderSuccessServiceResponse>) => {
                return {
                    ...state,
                    orderRequest: false,
                    currentOrder: data,
                };
            })
            .addCase(setOrder.rejected, (state) => {
                return {
                    ...state,
                    orderRequest: false,
                    orderFailed: true,
                    currentOrder: null,
                };
            });
    },
});

const { reducer } = slice;

export { reducer };

export const { resetOrderDetails, selectIngredient, resetSelectedIngredient } = slice.actions;
