"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { deleteData, putData, postData } from "../../../utils/apiCall";
import { Checkbox } from "flowbite-react";
<<<<<<< HEAD
function Page() {
  const [apiData, setApiData] = useState([]);
  const [task, setTask] = useState(null);
=======
import { deleteData, postData } from "../../../utils/apiCall";
function page() {
  const [apiData, setapiData] = useState([]);
  const [task, setTask] = useState(null); // Add state for task
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowName, setEditingRowName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [calories, setCalories] = useState("");
<<<<<<< HEAD
  const [award, setAward] = useState(false);

  async function updateValues() {
=======
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
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
    const myForm = {
      exerciseId: editingRowId,
      mealType: mealType,
      protein: protein,
      calories: calories,
      date: date,
    };

    try {
<<<<<<< HEAD
      const response = await axios.put(
        "http://127.0.0.1:8000/api/diet/update",
        myForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
=======
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
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce

      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.detail
      );
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/diet/getall/${localStorage.getItem(
          "UserID"
        )}`
      );
      const data = response.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

<<<<<<< HEAD
  const handleDelete = async (exerciseId) => {
    const response = await deleteData(
      "http://127.0.0.1:8000/api/diet/delete",
      { exerciseId: exerciseId }
    );
    console.log(response);
    if (response.message) window.location.reload();
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    let myForm = formObject;
    console.log(myForm);
    const body = {
      userid: localStorage.getItem("UserID"),
      exerciseName: myForm.exerciseName,
      duration: myForm.duration, 
      distance: myForm.distance ,
      calories: myForm.calories,
      achievement: award,
    };
    console.log(body);

    const { data, error } = await postData(
      "http://127.0.0.1:8000/api/diet/add",
      body
    );
=======
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
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
    console.log("new", data);
    if (data) {
      window.location.reload();
    } else {
      console.log(error);
    }
<<<<<<< HEAD
  };

=======
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
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setApiData(data);
    })();
  }, []);

  return (
<<<<<<< HEAD
    <div className="bg-gray-950 w-full  h-[90vh]">
      <div className="flex w-full xl:w-3/4 xl:mx-auto  gap-2 p-3  justify-evenly  ">
        <div className="  rounded-xl  xl:w-1/2 w-3/4 h-[85vh] overflow-auto ">
          <div className="relative overflow-x-auto rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
              <thead className=" text-gray-100 capitalize  font-bold dark:bg-gray-700 bg-red-800 ">
                <tr>
                  <th
                    scope="col"
                    className=" text-center p-3 border-r border-slate-600 "
                  >
                    Meal
                  </th>
                  <th
                    scope="col"
                    className=" text-center p-3 border-r border-slate-600 "
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className=" text-center p-3 border-r border-slate-600 "
                  >
                    Protein
                  </th>
                  <th
                    scope="col"
                    className=" text-center p-3 border-r border-slate-600 "
=======
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
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
                  >
                    Calories
                  </th>
                  <th
                    scope="col"
<<<<<<< HEAD
                    className=" text-center p-3 border-r border-slate-600 "
                  >
                    Actions
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
                {apiData.map((item) => (
=======
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
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
                  <tr
                    key={item.exerciseId}
                    className="dark:bg-gray-800 dark:text-gray-400 text-center"
                  >
<<<<<<< HEAD
=======
                    <th className="border-r border-slate-600 border-t">
                      {item.exerciseName}
                    </th>
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.exerciseId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
<<<<<<< HEAD
                          name="mealType"
                          type="text"
                          value={item.mealType}
=======
                          name="duration"
                          placeholder={item.duration}
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      ) : (
                        item.mealType
                      )}
                    </td>
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.exerciseId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
<<<<<<< HEAD
                          name="date"
                          type="date"
                          value={item.date}
=======
                          placeholder={item.distance}
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      ) : (
                        item.date
                      )}
                    </td>
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.exerciseId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
<<<<<<< HEAD
                          name="protein"
                          type="number"
                          placeholder={item.protein}
                          onChange={(e) => {
                            setProtein(e.target.value);
                          }}
                        />
                      ) : (
                        item.protein
                      )}
                    </td>
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.exerciseId ? (
                        <input
                          className=" rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
                          name="calories"
                          type="number"
=======
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
                          placeholder={item.calories}
                          onChange={(e) => {
                            setCalories(e.target.value);
                          }}
                        />
                      ) : (
                        item.calories
                      )}
                    </td>
<<<<<<< HEAD
                    <td className=" border-slate-600 border-t p-4 border-r">
=======
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
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
                      <button
                        className="bg-blue-600 px-6 py-1 rounded text-white hover:bg-blue-700"
                        onClick={() => {
                          setEditingRowId(item.exerciseId);
                          setDate(item.date);
                          setMealType(item.mealType);
                          setProtein(item.protein);
                          setCalories(item.calories);
                          setIsEditing(true);
                        }}
                        className="bg-blue-500 px-6 py-1 rounded text-white"
                      >
                        Edit
                      </button>
                    </td>
                    <td className=" border-slate-600 border-t p-4 ">
                      <button
                        onClick={() => {
                          handleDelete(item.exerciseId);
                        }}
<<<<<<< HEAD
                        className="bg-red-500 px-6 py-1 rounded text-white"
=======
                        className="bg-red-600 px-6 py-1 rounded text-white hover:bg-red-700"
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
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
<<<<<<< HEAD
                  setDate();
                  setMealType();
                  setProtein();
                  setCalories();
=======
                  setEditingRowName();
                  setCalories();
                  setDistance();
                  setAward();
                  setDuration();
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
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

<<<<<<< HEAD
        <div className=" w-1/3">
          <section className="bg-white dark:bg-gray-800 rounded-xl">
            <div className="pb-5 px-4 pt-3  rounded-md  w-full flex flex-col items-start ">
              <h2 className="mb-4 text-xl font-bold   text-center w-full dark:text-white">
                Add a new Meal
=======
        <div className={`w-1/3 ${isEditing ? " hidden " : " block "} `}>
          <section className="bg-white dark:bg-gray-900 rounded-xl">
            <div className="pb-5 px-4 pt-3  rounded-md  w-full flex flex-col items-start">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center w-full">
                Add a new Exercise
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
              </h2>
              <form
                onSubmit={handleAdd}
                action="#"
                className="flex flex-col w-full justify-center"
              >
<<<<<<< HEAD
                <div className=" ">
                  <Dropdown
                    label={mealType}
                    dismissOnClick="false"
                    className=" bg-white px-4"
                    name="mealType"
                    value={mealType}
                    required
                  >
                    <Dropdown.Item
                      className=" text-white"
                      onClick={() => {
                        setMealType(mealType=>"Breakfast");
                      }}
                    >
                      Breakfast
                    </Dropdown.Item>
                    <Dropdown.Item
                      className=" text-white"
                      onClick={() => {
                        setMealType(mealType=>"Lunch");
                      }}
                    >
                      Lunch
                    </Dropdown.Item>
                    <Dropdown.Item
                      className=" text-white"
                      onClick={() => {
                        setMealType(mealType=>"Dinner");
                      }}
                    >
                      Dinner
                    </Dropdown.Item>
                  </Dropdown>

=======
                <div className="">
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
                  <div className="w-full my-2">
                    <label
                      htmlFor="brand"
                      className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
<<<<<<< HEAD
                      placeholder="date"
                      required={true}
=======
                      placeholder="Exercise Name"
                      required
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
                    />
                  </div>
                  <div className="w-full  my-2">
                    <label
                      htmlFor="price"
                      className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Protein in grams
                    </label>
                    <input
                      type="number"
<<<<<<< HEAD
                      name="protein"
                      step="any"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="grams"
                      required=""
                    />
                  </div>
                  <div className="w-fullmy-2">
=======
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
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
                    <label
                      htmlFor="price"
                      className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Calories
                    </label>
                    <input
                      type="number"
<<<<<<< HEAD
                      step="any"
                      name="calories"
                      placeholder="Kcal"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
                <div className="   my-5">
                  <button
                    type="submit"
                    className="w-full px-3 py-2    font-bold  text-center text-white bg-green-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-green-400"
                  >
                    Add
                  </button>
                </div>
                {/* 
                <button
                  type="submit"
                  className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setTask(1)}
                >
                  Update Parameter
                </button> */}
=======
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
>>>>>>> f74fc56ac7ba30f553a33088a90d806ce283d0ce
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Page;
