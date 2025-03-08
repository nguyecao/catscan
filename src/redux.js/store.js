import { configureStore } from "@reduxjs/toolkit"
import loadedModelsReducer from './loadedModelsSlice'

const store = configureStore({
    reducer: {
        loadedModels: loadedModelsReducer
    }
})

store.subscribe(() => {
    console.log('== store:', store.getState())
})

export default store