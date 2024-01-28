"use client"
import React, { useState,useEffect } from 'react'
import axios from 'axios';
async function page() {
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
      
        // Convert form data to an object
        const formObject = Object.fromEntries(formData.entries());
        console.log(JSON.stringify(formObject));
        const myForm= {
            "userid": localStorage.getItem("UserID"),
            "workoutName": formObject.workoutName,
            "reps": formObject.reps ,
            "weight": formObject.weight, 
            "date": formObject.date,
            "achievement": false
          }
          console.log(myForm);
        // Post the form data to your API route using Axios
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/workout/add", myForm, {
            headers: {
              "Content-Type": "application/json",
            },
           }).then(response => {
            console.log(response);
          }).catch(error => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
      
          console.log(myForm,"hoiiii");
      
          if (!response.data) {
            throw new Error("Network response was not ok");
          }
          console.log(response.data);
          //router.replace("/");
          // Handle the response data
          console.log(response.data, "helloooo");
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error.message);
      
         
        }
      }

      async function handleUpdateSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
      
        // Convert form data to an object
        const formObject = Object.fromEntries(formData.entries());
        console.log(JSON.stringify(formObject),"updated");

        const myForm= {
          "workoutId": await fetchWorkoutID(formObject.workoutName),
            "workoutName": formObject.workoutName,
            "reps": formObject.reps ,
            "weight": formObject.weight, 
            "date": formObject.date,
          "achievement": false
        }
          console.log(myForm,"updated");
        // Post the form data to your API route using Axios

        try {
          const response = await axios.put("http://127.0.0.1:8000/api/workout/update",myForm, {
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          //console.log(myForm,"hoiiii");
      
          if (!response.data) {
            throw new Error("Network response was not ok");
          }
          console.log(response.data);
          //router.replace("/");
          // Handle the response data
          console.log(response.data, "helloooo");
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error.message);
        }
      }

      async function handleDeleteSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
      
        // Convert form data to an object
        const formObject = Object.fromEntries(formData.entries());
        console.log(JSON.stringify(formObject),"deleteLog");

        const myForm= {
          "workoutId": await fetchWorkoutID(formObject.workoutName),
        }
          console.log(myForm,"deleting");
        // Post the form data to your API route using Axios
      
      
        try {
          const response = await axios.delete("http://127.0.0.1:8000/api/workout/delete",{"data":myForm
        }, {
            headers: {
              "Content-Type": "application/json",
            },
          }).then(response => {
            console.log(response);
          }).catch(error => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
      
          console.log(response,"hoiiii");
      
          if (!response.data) {
            throw new Error("Network response was not ok");
          }
          console.log(response.data);
          //router.replace("/");
          // Handle the response data
          console.log(response.data, "helloooo");
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error.message);
        }
      }
      const fetchWorkoutID = async (WorkoutName) => {
        try {
          // Replace 'API_ENDPOINT' with the actual endpoint of your API
          let apistr='http://127.0.0.1:8000/api/workout/getall/'+localStorage.getItem('UserID');
          const response = await axios.get(apistr);
          const data = response.data;
          function searchWorkoutIdByName(WorkoutName) {
            for (const Workout of data) {
              if (Workout.workoutName.toLowerCase() === WorkoutName.toLowerCase()) {
                return Workout.workoutId;
              }
            }
            return null; // Return null if WorkoutName is not found
          }
          console.log(searchWorkoutIdByName(WorkoutName))
         return searchWorkoutIdByName(WorkoutName);
          }
        catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      console.log(await fetchWorkoutID("yoga"));
  return (<>
    <section className="bg-white dark:bg-gray-900">       
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Add a new Workout
    </h2>
    <form onSubmit={handleSubmit} action="#">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

        <div className="w-full">
          <label
            htmlFor="brand"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Workout Name
          </label>
          <input
            type="text"
            name="workoutName"
            id="brand"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Workout Name"
            required=""
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
          Reps count
          </label>
          <input
            type="number"
            name="reps"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="30"
            required=""
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           weight in kg
          </label>
          <input
            type="number"
            name="weight"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="type 0 if not applicable"
            required=""
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            type="text"
            name="date"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="YYYY-MM-DD"
            required=""
          />
        </div>

      </div>
      <button
        type="submit"
        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Add Workout
      </button>
    </form>
  </div>
</section>

<section className="bg-white dark:bg-gray-900">       
<div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
    Update a Workout
  </h2>
  <form onSubmit={handleUpdateSubmit} action="#">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

        <div className="w-full">
          <label
            htmlFor="brand"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Workout Name
          </label>
          <input
            type="text"
            name="workoutName"
            id="brand"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Workout Name"
            required=""
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
          Reps count
          </label>
          <input
            type="number"
            name="reps"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="30"
            required=""
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           weight in kg
          </label>
          <input
            type="number"
            name="weight"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="type 0 if not applicable"
            required=""
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            type="text"
            name="date"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="YYYY-MM-DD"
            required=""
          />
        </div>

      </div>
      <button
        type="submit"
        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Update Workout
      </button>
    </form>
</div>
</section>
<section className="bg-white dark:bg-gray-900">       
<div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
    Delete a Workout
  </h2>
  <form onSubmit={handleDeleteSubmit} action="#">
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

      <div className="w-full">
        <label
          htmlFor="brand"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Workout Name
        </label>
        <input
          type="text"
          name="workoutName"
          id="brand"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Workout Name"
          required=""
        />
      </div>

    </div>
    <button
      type="submit"
      className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
    >
      Delete Workout
    </button>
  </form>
</div>
</section>
</>
  )
}

export default page