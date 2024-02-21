"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox } from "flowbite-react";
function page() {
  const [apiData, setapiData] = useState([]);
  const [task, setTask] = useState(null); // Add state for task
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowName, setEditingRowName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [calories, setCalories] = useState("");
  const [award, setAward] = useState(false);
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    let url, method;
    let myForm = {};

    switch (task) {
      case 0: // Add
        url = "http://127.0.0.1:8000/api/exercise/add";
        method = "POST";
        myForm = {
          userId: localStorage.getItem("UserID"),
          exerciseName: formObject.exerciseName,
          duration: formObject.duration,
          distance: formObject.distance,
          calories: formObject.calories,
          achievement: false,
        };
        break;
      case 1: // Update
        url = "http://127.0.0.1:8000/api/exercise/update";
        method = "PUT";
        myForm = {
          exerciseId: await fetchExerciseID(formObject.exerciseName),
          exerciseName: formObject.exerciseName,
          duration: formObject.duration,
          distance: formObject.distance,
          calories: formObject.calories,
          achievement: false,
        };
        break;
      case 2: // Delete
        url = "http://127.0.0.1:8000/api/exercise/delete";
        method = "DELETE";
        myForm = {
          exerciseId: await fetchExerciseID(formObject.excerciseName),
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
      window.location.reload();
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    }
  };



   async function updateValues() {
    const myForm = {
      exerciseId: editingRowId,
      exerciseName: editingRowName,
      duration: duration,
      distance: distance,
      calories: calories,
      achievement: award,
    };
    console.log(myForm, "updated");
    // Post the form data to your API route using Axios

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/exercise/update",
        myForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(response => {
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

      //console.log(myForm,"hoiiii");
      window.location.reload();
      if (!response.data) {
        throw new Error("Network response was not ok");
      }
      console.log(response.data);
      //router.replace("/");
      // Handle the response data
      console.log(response.data, "helloooo");
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    }
  }

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);

  //   // Convert form data to an object
  //   const formObject = Object.fromEntries(formData.entries());
  //   console.log(JSON.stringify(formObject));
  //   const myForm = {
  //     userId: localStorage.getItem("UserID"),
  //     exerciseName: formObject.excerciseName,
  //     duration: formObject.duration,
  //     distance: formObject.distance,
  //     calories: formObject.calories,
  //     achievement: false,
  //   };
  //   console.log(myForm);
  //   // Post the form data to your API route using Axios
  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/api/exercise/add",
  //       myForm,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

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
  //     exerciseId: await fetchExerciseID(formObject.excerciseName),
  //     exerciseName: formObject.excerciseName,
  //     duration: formObject.duration,
  //     distance: formObject.distance,
  //     calories: formObject.calories,
  //     achievement: false,
  //   };
  //   console.log(myForm, "updated");
  //   // Post the form data to your API route using Axios

  //   try {
  //     const response = await axios.put(
  //       "http://127.0.0.1:8000/api/exercise/update",
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
  //     exerciseId: await fetchExerciseID(formObject.excerciseName),
  //   };
  //   console.log(myForm, "deleting");
  //   // Post the form data to your API route using Axios

  //   try {
  //     const response = await axios
  //       .delete(
  //         "http://127.0.0.1:8000/api/exercise/delete",
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
  // const fetchExerciseID = async (exerciseName) => {
  //   try {
  //     // Replace 'API_ENDPOINT' with the actual endpoint of your API
  //     let apistr =
  //       "http://127.0.0.1:8000/api/exercise/getall/" +
  //       localStorage.getItem("UserID");
  //     const response = await axios.get(apistr);
  //     const data = response.data;
  //     setapiData(data);
  //     function searchExerciseIdByName(exerciseName) {
  //       for (const exercise of data) {
  //         if (
  //           exercise.exerciseName.toLowerCase() === exerciseName.toLowerCase()
  //         ) {
  //           return exercise.exerciseId;
  //         }
  //       }
  //       return null; // Return null if exerciseName is not found
  //     }
  //     console.log(searchExerciseIdByName(exerciseName));
  //     return searchExerciseIdByName(exerciseName);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/exercise/getall/" +
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
      <div className="my-6 grid grid-cols-2 gap-4 mx-3">
        <div className=" bg-gray-900 rounded-xl h-fit">
          <div className="relative overflow-x-auto rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Exercise Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Duration
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Distance
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Calories
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Acheievments
                  </th>
                  <th scope="col" className="px-6 py-3">Edits</th>
                </tr>
              </thead>
              <tbody>
                {apiData.map((item) => (
                  <tr key={item.exerciseId} className="dark:bg-gray-800 dark:text-gray-400">
                    <th className="text-center">{item.exerciseName}</th>
                    <td className=" text-center">
                      {editingRowId === item.exerciseId ? (
                        <input
                          className="text-white placeholder-teal-100 bg-gray-700 caret-white"
                          name="duration"
                          placeholder={item.duration}
                          onChange={(e) => {
                            setDuration(e.target.value);
                          }}
                        />
                      ) : (
                        item.duration
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingRowId === item.exerciseId ? (
                        <input
                          className="text-white placeholder-teal-100 bg-gray-700 caret-white"
                          placeholder={item.distance}
                          onChange={(e) => {
                            setDistance(e.target.value);
                          }}
                        />
                      ) : (
                        item.distance
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingRowId === item.exerciseId ? (
                        <input
                          className="text-white placeholder-teal-100 bg-gray-700 caret-white"
                          placeholder={item.calories}
                          onChange={(e) => {
                            setCalories(e.target.value);
                          }}
                        />
                      ) : (
                        item.calories
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingRowId === item.exerciseId ? (
                        <Checkbox defaultChecked={item.achievement ===  1.0} onChange={(e)=>setAward(e.target.checked)} />
                        
                      ) : (
                        <Checkbox disabled defaultChecked={item.achievement ===  1.0} />
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => {
                          setEditingRowId(item.exerciseId);
                          setEditingRowName(item.exerciseName);
                          setCalories(item.calories);
                          setDistance(item.distance);
                          setAward(item.achievement);
                          setDuration(item.duration);
                          setIsEditing(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isEditing === true ? (
            <td className="px-6 py-4 items-center">
              <button className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                onClick={() => {
                  setIsEditing(false);
                  setEditingRowId(null); 
                  updateValues();
                }}
              >
                Save
              </button>
            </td>
          ) : (
            <></>
          )}
        </div>

        <div className="col-span-1 overflow-y-auto h-screen scroll rounded-xl">
          <section className="bg-white dark:bg-gray-900 rounded-xl">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Add a new Exercise
              </h2>
              <form onSubmit={handleSubmit2} action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Exercise Name
                    </label>
                    <input
                      type="text"
                      name="excerciseName"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Exercise Name"
                      required=""
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Duration in Minutes
                    </label>
                    <input
                      type="number"
                      name="duration"
                      step="any"
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
                      Distance in kms
                    </label>
                    <input
                      type="number"
                      name="distance"
                      step="any"
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
                      Calories
                    </label>
                    <input
                      type="number"
                      name="calories"
                      step="any"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Kcal"
                      required=""
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setTask(0)} // Set task to  0 for Add
                >
                  Add Exercise
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setTask(1)} // Set task to  1 for Update
                >
                  Update Exercise
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setTask(2)} // Set task to  2 for Delete
                >
                  Delete Exercise
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
