import React, { useEffect, useState } from 'react'
import { getData } from '../../../utils/apiCall'

export const LatestMeal = () => {
    const [dietInfo, setdietInfo] = useState()
    useEffect(() => {
        const callApi=async()=>{
            const data =await getData(`http://127.0.0.1:8000/api/diet/getLatest/${localStorage.getItem('UserID')}`);
if(data){
   setdietInfo(data?.data)
}
            
        }
        callApi()
    }, [])
    
  return (
    <div className='bg-background-900 h-full rounded-lg flex p-1 items-center justify-evenly text-center'>
        <p className='text-xl  font-bold'> {dietInfo?.mealType}</p>
        <p className='text-sm font-light'>Protein : {dietInfo?.protein } gm</p>
        <p className='text-sm font-light'>Calories : {dietInfo?.calories} kcal</p>

    </div>
  )
}
