import React, { useState } from 'react'
import { trpc } from '../utils/trpc'

export default function AddDataDisabilities() {

  const [initialData, setInitialData] = useState({
    name: ''
  })

  const mutation = trpc.useMutation(['disabilities.add-data-disabilities'])

  const handleSubmit = (e: React.SyntheticEvent)=>{
    e.preventDefault()
    
    if(initialData.name !== ''){
      mutation.mutate({name: initialData.name}, {
        onSuccess(data, variables, context) {
          // window.alert(data)
          setInitialData({name: ''})
        },
        onError(error, variables, context) {
          // window.alert(error)
        },
      })
    }

    return null
  }

  return (
    <div className='w-ful h-full'>
      <form 
        onSubmit={handleSubmit} 
        className='flex flex-col width-[300px] h-full bg-yellow-200 justify-center items-center'>
        <input
          className='border border-red-500 rounded px-2' 
          type="text" 
          placeholder='Nama' 
          value={initialData.name} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setInitialData({...initialData, ...{name: e.target.value}})}/>
        <button className='bg-red-500 p-1 rounded w-fit h-fit'>Submit</button>
      </form>
    </div>
  )
}
