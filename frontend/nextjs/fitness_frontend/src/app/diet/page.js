"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { deleteData, putData, postData } from "../../../utils/apiCall";
import { Dropdown } from "flowbite-react";
function Page() {
  const [apiData, setApiData] = useState([]);
  const [task, setTask] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowName, setEditingRowName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [protein, setProtein] = useState(0);
  const [calories, setCalories] = useState(0);
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("Meal Type");

  async function updateValues() {
    const myForm = {
      dietId: editingRowId,
      mealType: mealType,
      protein: protein,
      calories: calories,
      date: date,
    };

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

  const handleDelete = async (dietId) => {
    const response = await deleteData(
      "http://127.0.0.1:8000/api/diet/delete",
      { dietId: dietId }
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
      mealType: mealType,
      protein: parseFloat(myForm.protein),
      calories: parseFloat(myForm.calories),
      date: myForm.date,
    };
    console.log(body);

    const { data, error } = await postData(
      "http://127.0.0.1:8000/api/diet/add",
      body
    );
    console.log("new", data);
    if (data) {
      window.location.reload();
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setApiData(data);
    })();
  }, []);

  return (
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
                  >
                    Calories
                  </th>
                  <th
                    scope="col"
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
                  <tr
                    key={item.dietId}
                    className="dark:bg-gray-800 dark:text-gray-400 text-center"
                  >
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.dietId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
                          name="mealType"
                          type="text"
                          value={item.mealType}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      ) : (
                        item.mealType
                      )}
                    </td>
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.dietId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
                          name="date"
                          type="date"
                          value={item.date}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      ) : (
                        item.date
                      )}
                    </td>
                    <td className="border-r border-slate-600 border-t">
                      {editingRowId === item.dietId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
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
                      {editingRowId === item.dietId ? (
                        <input
                          className=" rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
                          name="calories"
                          type="number"
                          placeholder={item.calories}
                          onChange={(e) => {
                            setCalories(e.target.value);
                          }}
                        />
                      ) : (
                        item.calories
                      )}
                    </td>
                    <td className=" border-slate-600 border-t p-4 border-r">
                      <button
                        onClick={() => {
                          setEditingRowId(item.dietId);
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
                          handleDelete(item.dietId);
                        }}
                        className="bg-red-500 px-6 py-1 rounded text-white"
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
                  setDate();
                  setMealType();
                  setProtein();
                  setCalories();
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

        <div className=" w-1/3">
          <section className="bg-white dark:bg-gray-800 rounded-xl">
            <div className="pb-5 px-4 pt-3  rounded-md  w-full flex flex-col items-start ">
              <h2 className="mb-4 text-xl font-bold   text-center w-full dark:text-white">
                Add a new Meal
              </h2>
              <form
                onSubmit={handleAdd}
                action="#"
                className="flex flex-col w-full justify-center"
              >
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

                  <div className="w-full my-2">
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="date"
                      required={true}
                    />
                  </div>
                  <div className="w-full  my-2">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Protein in grams
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
                  <div className="w-fullmy-2">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Calories
                    </label>
                    <input
                      type="number"
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
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Page;
