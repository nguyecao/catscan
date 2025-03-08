import { createSlice } from "@reduxjs/toolkit";

const loadedModelsSlice = createSlice({
    name: 'loadedModels',
    initialState: {animalsModel: null, myModel: null, cocossdModel: null},
    reducers: {
        setAnimalsModel(state, action) {
            const animalsModel = action.payload
            state.animalsModel = animalsModel
        },
        setMyModel(state, action) {
            const myModel = action.payload
            state.myModel = myModel
        },
        setCocossdModel(state, action) {
            const cocossdModel = action.payload
            state.cocossdModel = cocossdModel
        },
    }
})

export default loadedModelsSlice.reducer
export const {setAnimalsModel, setMyModel, setCocossdModel} = loadedModelsSlice.actions
export const selectLoadedModels = loadedModelsSlice.selectSlice