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
    selectedInfredients: ingredient[],
    currentIngredient: null,
    currentOrder: null | orderSuccessServiceResponse,
    orderRequest: boolean,
    orderFailed: boolean,
}
type RootState = ReturnType<typeof import('../src/services/store').getState>;
type AppDispatch = ReturnType<typeof import('../src/services/store').dispatch>;
