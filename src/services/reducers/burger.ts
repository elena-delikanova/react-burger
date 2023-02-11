import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { api } from '../../components/api';
import { BUN_TYPE } from '../../utils/constants';
import { nanoid } from '@reduxjs/toolkit';
import update from 'immutability-helper';

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

const calculateOrderPrice = (ingredients: ingredient[]) => {
    const orderPrice = ingredients.reduce((price, ingredient) => {
        if (ingredient.type === BUN_TYPE) {
            price += ingredient.price * 2;
        } else {
            price += ingredient.price;
        }
        return price;
    }, 0);
    return orderPrice;
};

const slice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        addIngredient: (state, { payload: ingredient }: PayloadAction<ingredient>) => {
            let updatedAddedIngridients = [...state.addedIngredients];
            if (ingredient.type === BUN_TYPE) {
                updatedAddedIngridients = updatedAddedIngridients.filter((addedIngredient) => {
                    return addedIngredient.type !== BUN_TYPE;
                });
            }
            updatedAddedIngridients.push({ ...ingredient, uniqueId: nanoid() });
            return {
                ...state,
                addedIngredients: updatedAddedIngridients,
                orderPrice: calculateOrderPrice(updatedAddedIngridients),
            };
        },
        removeIngredient: (state, { payload: ingredient }: PayloadAction<ingredient>) => {
            const updatedAddedIngridients = [
                ...state.addedIngredients.filter((addedIngredient) => {
                    return addedIngredient.uniqueId !== ingredient.uniqueId;
                }),
            ];
            return {
                ...state,
                addedIngredients: updatedAddedIngridients,
                orderPrice: calculateOrderPrice(updatedAddedIngridients),
            };
        },
        moveIngredient: (state, { payload: [draggedIndex, hoveredIndex] }: PayloadAction<[number, number]>) => {
            if (draggedIndex === hoveredIndex) {
                return;
            }
            const addedIngredients = [...state.addedIngredients];
            const updatedAddedIngredients = update(addedIngredients, {
                $splice: [
                    [draggedIndex, 1],
                    [hoveredIndex, 0, addedIngredients[draggedIndex]],
                ]
            });
            return {
                ...state,
                addedIngredients: updatedAddedIngredients,
            }
        },
        selectIngredient: (state, { payload: ingredient }: PayloadAction<ingredient>) => {
            return {
                ...state,
                currentIngredient: ingredient,
            };
        },
        resetSelectedIngredient: (state) => {
            return {
                ...state,
                currentIngredient: null,
            };
        },
        resetOrderDetails: (state) => {
            return {
                ...state,
                orderFailed: false,
                orderRequest: false,
                currentOrder: null,
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

export const {
    resetOrderDetails,
    selectIngredient,
    resetSelectedIngredient,
    addIngredient,
    removeIngredient,
    moveIngredient,
} = slice.actions;
