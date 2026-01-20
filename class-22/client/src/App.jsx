import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {useDispatch, useSelector} from "react-redux"
import { addTodo } from './features/todoSlice'
import { useAddProductMutation, useGetProductsQuery, useUpdateProductMutation } from './services/products'
function App() {

  const dispatch = useDispatch();
  const todos = useSelector((state)=> state.todos.todos)


  const {data, isLoading} = useGetProductsQuery();

  const [addProduct, {isLoading: isAdding}] = useAddProductMutation();

  const [updateProduct, {
isLoading: isUpdating
  }]  = useUpdateProductMutation();

  console.log("Products Data:", data);

  // if(isLoading){
  //   return <div style={{width: '500px', height: '500px', color: 'blue', fontSize: '80px'}}>Loading...</div>
  // }


  if(isAdding){
    return <div style={{width: '500px', height: '500px', color: 'green', fontSize: '80px'}}>Adding Product...</div>
  }

  function handleUpdateProduct(productId){
    updateProduct({
        id: productId,
        price: 2500,
        inStock: false
    })
  }

  function handleAddProduct(){

    addProduct( {
        name: "Product 1 - Sindhi Ajrak Shawl",
        description: "A symbol of Sindhi culture, this block-printed shawl features geometric patterns in deep red and indigo blue. Made from soft, breathable cotton.",
        price: 2200,
        category: "Clothing",
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        inStock: true
    },)
  }

  // function handleAddTodo(){
  //   dispatch(addTodo({
  //     text: "New Todo Item",
  //     completed: true
  //   }))
  // }

  return (
  <div>

{
  data?.products?.map((item)=>(
    <>
    <div key={item._id}>
      <h3>{item.name}</h3>
      <p>Price: ${item.price}</p>
      <p>{item.description}</p>
    </div>

    <button onClick={()=> handleUpdateProduct(item._id)}>
      Update Product
    </button>
    </>
  ))
}

<button onClick={handleAddProduct}>ADD PRODUCT </button>

{/* {
  todos.map((todo)=>(
    <div key={todo.id}>
      <h3>{todo.text}</h3>
      <p>{todo.completed ? "Completed" : "Not Completed"}</p>
    </div>
  ))
} */}


    {/* <button onClick={handleAddTodo}>ADD TODO </button> */}
  </div>
  )
}

export default App
