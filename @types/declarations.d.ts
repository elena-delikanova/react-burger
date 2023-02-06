type ingredient = {
    _id: string;
    name: string;
    image_large: string;
    image: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    type: string;
    uniqueId?: string;
};

type orderSuccessServiceResponse = {
    name: string;
    order: {
        number: number;
    };
    success: boolean;
};

type initialState = {
    ingredients: ingredient[],
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    addedIngredients: ingredient[],
    currentIngredient: null | ingredient,
    currentOrder: null | orderSuccessServiceResponse,
    orderRequest: boolean,
    orderFailed: boolean,
    orderPrice: number,
}
type RootState = ReturnType<typeof import('../src/services/store').getState>;
type AppDispatch = ReturnType<typeof import('../src/services/store').dispatch>;
