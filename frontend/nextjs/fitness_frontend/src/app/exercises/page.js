"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox } from "flowbite-react";
import { deleteData, postData } from "../../../utils/apiCall";
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
  const exerciseUrl = {
      post: "http://127.0.0.1:8000/api/exercise/add",
      put: "http://127.0.0.1:8000/api/exercise/update",
      delete: "http://127.0.0.1:8000/api/exercise/delete",
      get: `http://127.0.0.1:8000/api/exercise/getall/${localStorage.getItem(
        "UserID"
      )}`,
    };

const  updateValues=async()=> {
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
      const response = await axios
        .put("http://127.0.0.1:8000/api/exercise/update", myForm, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
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

  const handleAdd = async (event) => { 
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    
    const body = {
      userId: localStorage.getItem("UserID"),
      exerciseName: formObject.excerciseName,
      duration: Number(formObject.duration),
      distance: Number(formObject.distance),
      calories: Number(formObject.calories),
      achievement: (formObject.award) ? true : false,
    };
    console.log((body))
    try {
      const { data, error } = await postData(exerciseUrl.post, body);
    console.log("new", data);
    if (data) {
      window.location.reload();
    } else {
      console.log(error);
    }
    } catch (error) {
      console.log(error);
      
    }
    
  };

  const handleDelete = async (exerciseId) => {
    const response = await deleteData(exerciseUrl.delete, {
      exerciseId: exerciseId,
    });
    console.log(response);
    if (response.message) window.location.reload();
  };
  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setapiData(data);
    })();
  }, []);
  return (
    <div className="bg-gray-950 w-full  h-[90vh] ">
      <div
        className={`flex w-full xl:w-3/4 xl:mx-auto  gap-2 p-3  justify-evenly ${
          isEditing ? "flex-col" : ""
        }`}
      >
        <div
          className={`  rounded-xl   overflow-auto ${
            isEditing ? "w-full" : "w-3/4 max-h-[85vh]  "
          }`}
        >
          <div className="relative overflow-x-auto rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
              <thead className=" text-gray-100 capitalize  font-bold dark:bg-gray-700 bg-red-800">
                <tr>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-slate-600"
                  >
                    Exercise Name
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-slate-600"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-slate-600"
                  >
                    Distance
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-slate-600"
                  >
                    Calories
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-slate-600"
                  >
                    Acheievments
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-slate-600"
                  >
                    Edits
                  </th>
                  <th
                    scope="col"
                    className=" text-center p-3  border-slate-600 "
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {apiData?.map((item) => (
                  <tr
                    key={item.exerciseId}
                    className="dark:bg-gray-800 dark:text-gray-400 text-center"
                  >
                    <th className="border-r border-slate-600 border-t">
                      {item.exerciseName}
                    </th>
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.exerciseId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
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
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.exerciseId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
                          placeholder={item.distance}
                          onChange={(e) => {
                            setDistance(e.target.value);
                          }}
                        />
                      ) : (
                        item.distance
                      )}
                    </td>
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.exerciseId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
                          placeholder={item.calories}
                          onChange={(e) => {
                            setCalories(e.target.value);
                          }}
                        />
                      ) : (
                        item.calories
                      )}
                    </td>
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.exerciseId ? (
                        <Checkbox
                          defaultChecked={item.achievement === 1.0}
                          onChange={(e) => setAward(e.target.checked)}
                        />
                      ) : (
                        <Checkbox
                          disabled
                          defaultChecked={item.achievement === 1.0}
                        />
                      )}
                    </td>
                    <td className="border-slate-600 border-t p-4 border-r">
                      <button
                        className="bg-blue-600 px-6 py-1 rounded text-white hover:bg-blue-700"
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
                    <td className=" border-slate-600 border-t p-4 ">
                      <button
                        onClick={() => {
                          handleDelete(item.exerciseId);
                        }}
                        className="bg-red-600 px-6 py-1 rounded text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isEditing === true ? (
            <div className="  p-4 flex items-center gap-4">
              <button
                className=" text-sm font-medium px-4 py-2 text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                onClick={() => {
                  setIsEditing(false);
                  setEditingRowId(null);
                  updateValues();
                }}
              >
                Save
              </button>

              <button
                className="text-red-500"
                onClick={() => {
                  setEditingRowId();
                  setEditingRowName();
                  setCalories();
                  setDistance();
                  setAward();
                  setDuration();
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className={`w-1/3 ${isEditing ? " hidden " : " block "} `}>
          <section className="bg-white dark:bg-gray-900 rounded-xl">
            <div className="pb-5 px-4 pt-3  rounded-md  w-full flex flex-col items-start">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center w-full">
                Add a new Exercise
              </h2>
              <form
                onSubmit={handleAdd}
                action="#"
                className="flex flex-col w-full justify-center"
              >
                <div className="">
                  <div className="w-full my-2">
                    <label
                      htmlFor="brand"
                      className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Exercise Name
                    </label>
                    <input
                      type="text"
                      name="excerciseName"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Exercise Name"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Duration in Minutes
                    </label>
                    <input
                      type="number"
                      name="duration"
                     
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="30"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Distance in kms
                    </label>
                    <input
                      type="number"
                      name="distance"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="type 0 if not applicable"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Calories
                    </label>
                    <input
                      type="number"
                      name="calories"
                      
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Kcal"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3 py-3">
                    <Checkbox name="award" />
                    <label className="text-white "> Achievement ? </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-5 w-full px-3 py-2    font-bold  text-center text-white bg-green-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-green-400 "
                  onClick={() => setTask(0)} // Set task to  0 for Add
                >
                  Add Exercise
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default page;
