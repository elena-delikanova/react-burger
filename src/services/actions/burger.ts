import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../components/api';

export const getIngredients = createAsyncThunk('burger/getIngredients', async () => {
    return (await api.getIngredients()).data;
});

export const setOrder = createAsyncThunk(
    'burger/setOrder',
    async ({ ingredientIdentifiers }: { ingredientIdentifiers: ingredient['_id'][] }) => {
        return await api.setOrder({ ingredientIdentifiers });
    },
);
