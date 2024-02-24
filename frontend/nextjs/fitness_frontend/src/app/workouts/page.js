"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox } from "flowbite-react";
import { deleteData, getData, postData, putData } from "../../../utils/apiCall";

function page() {
  const [apiData, setapiData] = useState([]);
  const [task, setTask] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowName, setEditingRowName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [award, setAward] = useState(false);
const [name, setname] = useState()
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");

  const workoutUrl = {
    post: "http://127.0.0.1:8000/api/workout/add",
    put: "http://127.0.0.1:8000/api/workout/update",
    delete: "http://127.0.0.1:8000/api/workout/delete",
    get: `http://127.0.0.1:8000/api/workout/getall/${localStorage.getItem(
      "UserID"
    )}`,
  };

  async function updateValues() {
    const myForm = {
      workoutId: editingRowId,
      workoutName: name ||editingRowName,
      reps: reps,
      weight: weight,
      date: date,
      achievement: award,
    };
    try {
      const response = await putData(workoutUrl.put, myForm);
      window.location.reload();
      if (!response.data) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    }
  }
  const fetchData = async () => {
    try {
      const response = await getData(workoutUrl.get) 
      if(response){
      setapiData(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = async (event) => { 
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    const body = {
      userid: localStorage.getItem("UserID"),
      workoutName: formObject.workoutName,
      reps: formObject.reps,
      weight: formObject.weight,
      date: formObject.date,
      achievement: formObject.award ? true : false,
    };
    
    const { data, error } = await postData(workoutUrl.post, body);
    
    if (data) {
      window.location.reload();
    } else {
      console.log(error);
    }
  };

  const handleDelete = async (workoutId) => {
    const response = await deleteData(workoutUrl.delete, {
      workoutId: workoutId,
    });
   
    if (response.message) window.location.reload();
  };
  useEffect(() => {
    (async () => {
       await fetchData();
    })();
  }, []);

  return (
    <div className="   w-full  h-[90vh] ">
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
            <table className="w-full text-sm text-left rtl:text-right text-white rounded-xl bg-background-900">
              <thead className=" dark:text-white capitalize  font-bold  bg-background-800 ">
                <tr>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-background-600"
                  >
                    Workout Name
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-background-600"
                  >
                    Reps
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-background-600"
                  >
                    Weight
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-background-600"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-background-600"
                  >
                    Acheievments
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-background-600"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className=" text-center p-3  border-background-600 "
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                {apiData?.map((item) => (
                  <tr
                    key={item.workoutId}
                    className=" dark:text-white text-center"
                  >
                    <td className="border-r border-background-600 border-t">
                    {editingRowId === item.workoutId ? (
                        <input
                        type="text"

                          className="w-max rounded  px-4 py-2 text-center bg-background-700 text-white placeholder:text-white placeholder:font-medium border-none"
                          placeholder={item.workoutName}
                          onChange={(e) => {
                            setname(e.target.value);
                          }}
                        />
                      ) : (
                        item.workoutName
                      )}
                    </td>
                    <td className="border-r border-background-600 border-t">
                      {editingRowId === item.workoutId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-background-700 text-white placeholder:text-white placeholder:font-medium border-none"
                          name="reps"
                          type="number"
                
                          placeholder={item.reps}
                          onChange={(e) => {
                            setReps(e.target.value);
                          }}
                        />
                      ) : (
                        item.reps
                      )}
                    </td>
                    <td className="border-r border-background-600 border-t">
                      {editingRowId === item.workoutId ? (
                        <input
                        type="number"

                          className="w-max rounded  px-4 py-2 text-center bg-background-700 text-white placeholder:text-white placeholder:font-medium border-none"
                          placeholder={item.weight}
                          onChange={(e) => {
                            setWeight(e.target.value);
                          }}
                        />
                      ) : (
                        item.weight
                      )}
                    </td>
                    <td className="border-r border-background-600 border-t">
                      {editingRowId === item.workoutId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-background-700 text-white placeholder:text-white placeholder:font-medium border-none"
                          type="date"
                          placeholder={item.date}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      ) : (
                        item.date
                      )}
                    </td>
                    <td className="border-r border-background-600 border-t">
                      {editingRowId === item.workoutId ? (
                        <Checkbox
                          defaultChecked={item.achievement}
                          onChange={(e) => setAward(e.target.checked)}
                        />
                      ) : (
                        <Checkbox
                          disabled
                          defaultChecked={item.achievement==1}
                        />
                      )}
                    </td>
                    <td className="border-background-600 border-t p-4 border-r">
                      <button
                        className="bg-blue-600 px-6 py-1 rounded text-white hover:bg-blue-700"
                        onClick={() => {
                          setEditingRowId(item.workoutId);
                          setEditingRowName(item.workoutName);
                          setAward(item.achievement);
                          setDate(item.date);
                          setReps(item.reps);
                          setWeight(item.weight);
                          setIsEditing(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td className=" border-background-600 border-t p-4 ">
                      <button
                        onClick={() => {
                          handleDelete(item.workoutId);
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
                  setAward();
                  setDate();
                  setReps();
                  setWeight();
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

        <div className={`w-1/3 ${isEditing?" hidden ":" block "} `}>
          <section className="bg-white dark:bg-background-900 rounded-xl">
            <div className="rounded-md  w-full flex flex-col items-start">
              <h2 className=" text-xl font-bold   text-center w-full dark:text-white pb-3 px-4 pt-3 border-b border-background-800  rounded-t-md">
                Add a new workout
              </h2>
              <form
                onSubmit={handleAdd}
                action="#"
                className="flex flex-col w-full justify-center p-4 text-white"
              >
                <div className="">
                  <div className="w-full my-2">
                    <label
                      htmlFor="brand"
                      className="block my-2 text-sm font-medium   dark:text-white"
                    >
                      Workout name
                    </label>
                    <input
                      type="text"
                      name="workoutName"
                      id="brand"
                      className="bg-background-800   text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 border-none"
                      placeholder="Workout Name"
                      required=""
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block my-2 text-sm font-medium   dark:text-white"
                    >
                      Reps Count
                    </label>
                    <input
                      type="number"
                      name="reps"
                      id="price"
                      className="bg-background-800   text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 border-none"
                      placeholder="30"
                      required=""
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block my-2 text-sm font-medium   dark:text-white"
                    >
                      Weight in Kg
                    </label>
                    <input
                      type="number"
                      name="weight"
                      id="price"
                      className="bg-background-800   text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 border-none"
                      placeholder="type 0 if not applicable"
                      required=""
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block my-2 text-sm font-medium   dark:text-white"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="price"
                      className="bg-background-800   text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 border-none"
                      placeholder="YYYY-MM-DD"
                      required=""
                    />
                  </div>
                  <div className="flex items-center gap-3 py-3">
                    <Checkbox name="award" />
                    <label className="text-white "> Achievement ? </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-5 w-full px-3 py-2    font-bold  text-center text-white bg-primary-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-700 "
                   // Set task to  0 for Add
                >
                  Add workout
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
