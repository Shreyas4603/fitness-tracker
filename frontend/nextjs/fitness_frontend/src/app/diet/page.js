"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { deleteData, getData, postData } from "../../../utils/apiCall";
function page() {
  const [apiData, setapiData] = useState([]);
  const [task, setTask] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowName, setEditingRowName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState("");
  const [mealType, setmealType] = useState();

  const dietUrl = {
    post: "http://127.0.0.1:8000/api/diet/add",
    put: "http://127.0.0.1:8000/api/diet/update",
    delete: "http://127.0.0.1:8000/api/diet/delete",
    get: `http://127.0.0.1:8000/api/diet/getall/${localStorage.getItem(
      "UserID"
    )}`,
  };

  async function updateValues() {
    const myForm = {
      dietId: editingRowId,
      mealType: mealType,
      protein: protein,
      calories: calories,
      date: date,
    };
    console.log(myForm, "updated");
    // Post the form data to your API route using Axios

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/diet/update",
        myForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      const response = await getData(dietUrl.get);
      const data = response;
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
      userid: localStorage.getItem("UserID"),
      mealType: formObject.mealType,
      protein: formObject.protein,
      calories: formObject.calories,
      date: formObject.date,
    };
    const { data, error } = await postData(dietUrl.post, body);
    console.log("new", data);
    if (data) {
      window.location.reload();
    } else {
      console.log(error);
    }
  };

  const handleDelete = async (dietId) => {
    const response = await deleteData(dietUrl.delete, {
      dietId: dietId,
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

  useEffect(() => {
    console.log(mealType);
  }, [mealType]);

  const handleMealChange = (event) => {
    setmealType(event.target.value);
  };
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
                    Meal Type
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-slate-600"
                  >
                    Protein
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
                    Date
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 border-r border-slate-600"
                  >
                    Edit
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
                    key={item.dietId}
                    className=" dark:bg-gray-800 text-center"
                  >
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.dietId ? (
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-center"
                          name="mealType"
                          onChange={handleMealChange}
                          value={mealType || item.mealType}
                        >
                          <option>Breakfast</option>
                          <option>Lunch</option>
                          <option>Evening snack</option>
                          <option>Dinner</option>
                        </select>
                      ) : (
                        item.mealType
                      )}
                    </td>
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.dietId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
                          name="protein"
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
                      {editingRowId === item.dietId ? (
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
                      {editingRowId === item.dietId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
                          placeholder={item.date}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      ) : (
                        item.date
                      )}
                    </td>
                    <td className="border-slate-600 border-t p-4 border-r">
                      <button
                        className="bg-blue-600 px-6 py-1 rounded text-white hover:bg-blue-700"
                        onClick={() => {
                          setEditingRowId(item.dietId);
                          setEditingRowName(item.mealType);
                          setCalories(item.calories);
                          setProtein(item.protein);
                          setDate(item.date);
                          setIsEditing(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td className=" border-slate-600 border-t p-4 ">
                      <button
                        onClick={() => {
                          handleDelete(item.dietId);
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
                setProtein();
                setDate();
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
              <h2 className="mb-4 text-xl font-bold   text-center w-full dark:text-white">
                Add a new workout
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
                      Meal Type
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      name="mealType"
                    >
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Evening snack</option>
                      <option>Dinner</option>
                    </select>
                    {/* <input
                      type="text"
                      name="mealType"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="meal type"
                      required=""
                    /> */}
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Protein
                    </label>
                    <input
                      type="number"
                      name="protein"
                      step="any"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="grams"
                      required=""
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
                      step="any"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="kcal"
                      required=""
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Date
                    </label>
                    <input
                      type="date"
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
                  className="mt-5 w-full px-3 py-2    font-bold  text-center text-white bg-green-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-green-400"
                >
                  Add meal
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
