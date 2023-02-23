import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { BUN_TYPE } from '../../utils/constants';
import { nanoid } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { getIngredients, setOrder } from '../actions/burger';

const slice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        addIngredient: (state, { payload: ingredient }: PayloadAction<ingredient>) => {
            let updatedAddedIngeidients: ingredient[] = [...state.addedIngredients];
            if (ingredient.type === BUN_TYPE) {
                updatedAddedIngeidients = updatedAddedIngeidients.filter((addedIngredient) => {
                    return addedIngredient.type !== BUN_TYPE;
                });
            }
            updatedAddedIngeidients.push({ ...ingredient, uniqueId: nanoid() });
            state.addedIngredients = updatedAddedIngeidients;
            slice.caseReducers.calculateOrderPrice(state);
        },
        removeIngredient: (state, { payload: ingredient }: PayloadAction<ingredient>) => {
            const updatedAddedIngeidients = [
                ...state.addedIngredients.filter((addedIngredient) => {
                    return addedIngredient.uniqueId !== ingredient.uniqueId;
                }),
            ];
            state.addedIngredients = updatedAddedIngeidients;
            slice.caseReducers.calculateOrderPrice(state);
        },
        moveIngredient: (state, { payload: [draggedIndex, hoveredIndex] }: PayloadAction<[number, number]>) => {
            if (draggedIndex === hoveredIndex) {
                return;
            }
            const addedIngredients: ingredient[] = [...state.addedIngredients];
            const updatedAddedIngredients: ingredient[] = update(addedIngredients, {
                $splice: [
                    [draggedIndex, 1],
                    [hoveredIndex, 0, addedIngredients[draggedIndex]],
                ]
            });
            state.addedIngredients = updatedAddedIngredients;
        },
        selectIngredient: (state, { payload: ingredient }: PayloadAction<ingredient>) => {
            state.currentIngredient = ingredient;
        },
        calculateOrderPrice: (state) => {
            state.orderPrice = state.addedIngredients.reduce((price, ingredient) => {
                if (ingredient.type === BUN_TYPE) {
                    price += ingredient.price * 2;
                } else {
                    price += ingredient.price;
                }
                return price;
            }, 0);
        },
        resetSelectedIngredient: (state) => {
            state.currentIngredient = initialState.currentIngredient;
        },
        resetCurrentOrder: (state) => {
            state.currentOrder = initialState.currentOrder;
        },
        resetAddedIngredients: (state) => {
            state.addedIngredients = [...initialState.addedIngredients];
        },
        resetOrderPrice: (state) => {
            state.orderPrice = initialState.orderPrice;
        },
        setOrderRequestStatusIdle: (state) => {
            state.orderRequestStatus = 'idle';
        },
        setIngredientsRequestStatusIdle: (state) => {
            state.ingredientsRequestStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.ingredientsRequestStatus = 'pending';
            })
            .addCase(getIngredients.fulfilled, (state, { payload: ingredients }: PayloadAction<ingredient[]>) => {
                state.ingredientsRequestStatus = 'fulfilled';
                state.ingredients = [...ingredients];
            })
            .addCase(getIngredients.rejected, (state) => {
                state.ingredientsRequestStatus = 'rejected';
            });
        builder
            .addCase(setOrder.pending, (state) => {
                state.orderRequestStatus = 'pending';
            })
            .addCase(setOrder.fulfilled, (state, { payload: data }: PayloadAction<orderSuccessServiceResponse>) => {
                slice.caseReducers.resetAddedIngredients(state);
                slice.caseReducers.resetOrderPrice(state);
                state.orderRequestStatus = 'fulfilled';
                state.currentOrder = {...data};
            })
            .addCase(setOrder.rejected, (state) => {
                slice.caseReducers.resetCurrentOrder(state);
                state.currentOrder = initialState.currentOrder;
                state.orderRequestStatus = 'rejected';
            });
    },
});

const { reducer } = slice;

export { reducer, getIngredients };

export const {
    selectIngredient,
    resetSelectedIngredient,
    addIngredient,
    removeIngredient,
    moveIngredient,
    calculateOrderPrice,
    setOrderRequestStatusIdle,
    setIngredientsRequestStatusIdle,
} = slice.actions;
