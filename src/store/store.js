import { configureStore, createSlice } from "@reduxjs/toolkit";


export const initialState = {
    user : null,
    loading : false,
    card : [],
 
};

const Slice = createSlice({
    name : "post",
    initialState : initialState,
    reducers : {
            AddCard : (state, action) => {
                
                   state.card.push(action.payload);
            },
            DeleteCard : (state, action) => {
               state.card = state.card.filter((item) => item.id !== action.payload );
            }

    }

   

}
);

export const   {card, AddCard, DeleteCard} = Slice.actions;

const store = configureStore({
    reducer : {
        post : Slice.reducer,
    }
})

export default store;


