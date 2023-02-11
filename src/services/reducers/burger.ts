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
            return {
                ...state,
                currentIngredient: null,
            };
        },
        resetCurrentOrder: (state) => {
            return {
                ...state,
                currentOrder: initialState.currentOrder,
            };
        },
        resetAddedIngredients: (state) => {
            return {
                ...state,
                addedIngredients: initialState.addedIngredients,
            }
        },
        resetOrderPrice: (state) => {
            return {
                ...state,
                orderPrice: initialState.orderPrice,
            }
        },
        setOrderRequestStatusIdle: (state) => {
            return {
                ...state,
                orderRequestStatus: 'idle',
            }
        },
        setIngredientsRequestStatusIdle: (state) => {
            return {
                ...state,
                ingredientsRequestStatus: 'idle',
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                return {
                    ...state,
                    ingredientsRequest: true,
                    ingredientsRequestStatus: 'pending',
                };
            })
            .addCase(getIngredients.fulfilled, (state, { payload: ingredients }: PayloadAction<ingredient[]>) => {
                return {
                    ...state,
                    ingredientsRequest: false,
                    ingredientsRequestStatus: 'fulfilled',
                    ingredients,
                };
            })
            .addCase(getIngredients.rejected, (state) => {
                return {
                    ...state,
                    ingredientsRequest: false,
                    ingredientsFailed: true,
                    ingredientsRequestStatus: 'rejected',
                };
            });
        builder
            .addCase(setOrder.pending, (state) => {
                return {
                    ...state,
                    orderRequestStatus: 'pending',
                };
            })
            .addCase(setOrder.fulfilled, (state, { payload: data }: PayloadAction<orderSuccessServiceResponse>) => {
                /* Хочется явно указать, что мы тут сбрасываем список ингредиентов и стоимость заказа. Но выглядит это стремновато. Нет ли более изящного способа?*/
                state = slice.caseReducers.resetAddedIngredients(state);
                state = slice.caseReducers.resetOrderPrice(state);
                return {
                    ...state,
                    orderRequestStatus: 'fulfilled',
                    currentOrder: data,
                };
            })
            .addCase(setOrder.rejected, (state) => {
                return {
                    ...state,
                    currentOrder: initialState.currentOrder,
                    orderRequestStatus: 'rejected',
                };
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
