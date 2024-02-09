"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
function page() {
  const [apiData, setapiData] = useState([]);
  const [task, setTask] = useState(null);

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    let url, method;
    let myForm = {};

    switch (task) {
      case 0: // Add
        url = "http://127.0.0.1:8000/api/workout/add";
        method = "POST";
        myForm = {
          userid: localStorage.getItem("UserID"),
          workoutName: formObject.workoutName,
          reps: formObject.reps,
          weight: formObject.weight,
          date: formObject.date,
          achievement: false,
        };
        break;
      case 1: // Update
        url = "http://127.0.0.1:8000/api/workout/update";
        method = "PUT";
        myForm = {
          workoutId: await fetchWorkoutID(formObject.workoutName),
          workoutName: formObject.workoutName,
          reps: formObject.reps,
          weight: formObject.weight,
          date: formObject.date,
          achievement: false,
        };
        console.log(myForm);
        break;
      case 2: // Delete
        url = "http://127.0.0.1:8000/api/workout/delete";
        method = "DELETE";
        myForm = {
          workoutId: await fetchWorkoutID(formObject.workoutName),
        };
        break;
      default:
        throw new Error("Invalid task.");
    }

    try {
      const response = await axios({
        url,
        method,
        data: myForm,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        throw new Error("Network response was not ok");
      }
      console.log(response.data);
      // Handle the response data
      console.log(response.data, "helloooo");
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    }
  };

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);

  //   // Convert form data to an object
  //   const formObject = Object.fromEntries(formData.entries());
  //   console.log(JSON.stringify(formObject));
  //   const myForm = {
  //     userid: localStorage.getItem("UserID"),
  //     workoutName: formObject.workoutName,
  //     reps: formObject.reps,
  //     weight: formObject.weight,
  //     date: formObject.date,
  //     achievement: false,
  //   };
  //   console.log(myForm);
  //   // Post the form data to your API route using Axios
  //   try {
  //     const response = await axios
  //       .post("http://127.0.0.1:8000/api/workout/add", myForm, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log(error.response.data);
  //           console.log(error.response.status);
  //           console.log(error.response.headers);
  //         } else if (error.request) {
  //           console.log(error.request);
  //         } else {
  //           console.log("Error", error.message);
  //         }
  //         console.log(error.config);
  //       });

  //     console.log(myForm, "hoiiii");

  //     if (!response.data) {
  //       throw new Error("Network response was not ok");
  //     }
  //     console.log(response.data);
  //     //router.replace("/");
  //     // Handle the response data
  //     console.log(response.data, "helloooo");
  //   } catch (error) {
  //     console.error(
  //       "There was a problem with the fetch operation:",
  //       error.message
  //     );
  //   }
  // }

  // async function handleUpdateSubmit(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);

  //   // Convert form data to an object
  //   const formObject = Object.fromEntries(formData.entries());
  //   console.log(JSON.stringify(formObject), "updated");

  //   const myForm = {
  //     workoutId: await fetchWorkoutID(formObject.workoutName),
  //     workoutName: formObject.workoutName,
  //     reps: formObject.reps,
  //     weight: formObject.weight,
  //     date: formObject.date,
  //     achievement: false,
  //   };
  //   console.log(myForm, "updated");
  //   // Post the form data to your API route using Axios

  //   try {
  //     const response = await axios.put(
  //       "http://127.0.0.1:8000/api/workout/update",
  //       myForm,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     //console.log(myForm,"hoiiii");

  //     if (!response.data) {
  //       throw new Error("Network response was not ok");
  //     }
  //     console.log(response.data);
  //     //router.replace("/");
  //     // Handle the response data
  //     console.log(response.data, "helloooo");
  //   } catch (error) {
  //     console.error(
  //       "There was a problem with the fetch operation:",
  //       error.message
  //     );
  //   }
  // }

  // async function handleDeleteSubmit(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);

  //   // Convert form data to an object
  //   const formObject = Object.fromEntries(formData.entries());
  //   console.log(JSON.stringify(formObject), "deleteLog");

  //   const myForm = {
  //     workoutId: await fetchWorkoutID(formObject.workoutName),
  //   };
  //   console.log(myForm, "deleting");
  //   // Post the form data to your API route using Axios

  //   try {
  //     const response = await axios
  //       .delete(
  //         "http://127.0.0.1:8000/api/workout/delete",
  //         { data: myForm },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log(error.response.data);
  //           console.log(error.response.status);
  //           console.log(error.response.headers);
  //         } else if (error.request) {
  //           console.log(error.request);
  //         } else {
  //           console.log("Error", error.message);
  //         }
  //         console.log(error.config);
  //       });

  //     console.log(response, "hoiiii");

  //     if (!response.data) {
  //       throw new Error("Network response was not ok");
  //     }
  //     console.log(response.data);
  //     //router.replace("/");
  //     // Handle the response data
  //     console.log(response.data, "helloooo");
  //   } catch (error) {
  //     console.error(
  //       "There was a problem with the fetch operation:",
  //       error.message
  //     );
  //   }
  // }
  const fetchWorkoutID = async (WorkoutName) => {
    try {
      // Replace 'API_ENDPOINT' with the actual endpoint of your API
      let apistr =
        "http://127.0.0.1:8000/api/workout/getall/" +
        localStorage.getItem("UserID");
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
      console.log(searchWorkoutIdByName(WorkoutName));
      return searchWorkoutIdByName(WorkoutName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/workout/getall/" +
          localStorage.getItem("UserID")
      );
      const data = response.data;
      console.log(data, "ffefef");
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setapiData(data);
    })();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mx-3">
        <div className=" bg-gray-900 rounded-xl h-fit">
          <div className="relative overflow-x-auto rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Workout Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Repetitions
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Weight
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {apiData.map((item) => (
                  <tr
                    key={item.workoutId}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.workoutName}
                    </th>
                    <td className="px-6 py-4">{item.reps}</td>
                    <td className="px-6 py-4">{item.weight}</td>
                    <td className="px-6 py-4">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-1 overflow-y-auto h-screen scroll rounded-xl">
          <section className="bg-white dark:bg-gray-900 rounded-xl">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Add a new workout
              </h2>
              <form onSubmit={handleSubmit2} action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      workout Name
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
                      Reps Count
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
                      Weight in Kg's
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
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="YYYY-MM-DD"
                      required=""
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setTask(0)} // Set task to  0 for Add
                >
                  Add workout
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setTask(1)} // Set task to  1 for Update
                >
                  Update workout
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setTask(2)} // Set task to  2 for Delete
                >
                  Delete workout
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default page;
