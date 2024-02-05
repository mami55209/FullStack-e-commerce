import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//creating the actionCreator for getting all the products
    export const getProducts = createAsyncThunk("products/getProducts",
    async(args,thunkAPI)=>{
        try{
            const res = await axios.get("http://localhost:5000/api/products");
            const data = res.data;
            return data;
        }catch(err){
            console.log(err);
        }
    })
    //creating the actionCreator for getting a specific product
 /*    export const getSingleProduct = createAsyncThunk("products/getSingleProduct",
    async(args,thunkAPI)=>{
        try{
            const res = await fetch(`http://localhost:5000/api/products/${args.productId}`);
            const data = await res.json();
            return data;
        }catch(err){
            console.log(err);
        }
    }) */
    //creating the products slice
    const productsSlice = createSlice({
    name:"products",
    initialState:{  
        products: null,
        singleProduct: null,
        filteredProducts: [],
        category : null,
        pending: null
        
    },
    reducers:{
        categoryFilter: (state,action)=>{
            const fullProducts = action.payload.fullProducts;
            const category = action.payload.category;
            if(category === "full items"){
                state.filteredProducts = state.products;
            }else{
                state.filteredProducts = fullProducts.filter(p=>{
                return p.category === category;
            })
            }
            state.category = category;
        },
        getSingleProduct:(state,action)=>{
            state.singleProduct = action.payload;
        }
    },
    extraReducers(builder){
       builder
       .addCase(getProducts.pending,(state,action)=>{
        state.pending = true;
       })
       .addCase(getProducts.fulfilled,(state,action)=>{
        state.products = action.payload;
        state.filteredProducts = action.payload;
        state.pending = false;
       })
       .addCase(getProducts.rejected,(state,action)=>{
        state.pending = "rejected";
        console.log("request failed", action);
       })
      /*  .addCase(getSingleProduct.pending,(state,action)=>{
       })
       .addCase(getSingleProduct.fulfilled,(state,action)=>{
        state.singleProduct = action.payload;
       })
       .addCase(getSingleProduct.rejected,(state,action)=>{
        console.log(action);
       }); */

    }
})
export const {categoryFilter ,getSingleProduct} = productsSlice.actions;
export default productsSlice.reducer;