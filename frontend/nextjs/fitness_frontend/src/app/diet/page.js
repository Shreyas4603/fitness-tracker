"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
function page() {
  const [apiData, setapiData] = useState([]);
  const [task, setTask] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowName, setEditingRowName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState("");
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    let url, method;
    let myForm = {};

    switch (task) {
      case 0: // Add
        url = "http://127.0.0.1:8000/api/diet/add";
        method = "POST";
        myForm = {
          userid: localStorage.getItem("UserID"),
          mealType: formObject.mealType,
          protein: formObject.protein,
          calories: formObject.calories,
          date: formObject.date,
         
        };
        break;
      case 1: // Update
        url = "http://127.0.0.1:8000/api/diet/update";
        method = "PUT";
        myForm = {
            dietId:await fetchDietId(formObject.mealType, formObject.date),
            mealType: formObject.mealType,
            protein: formObject.protein,
            calories: formObject.calories,
            date: formObject.date,
        
        };
        console.log(myForm);
        break;
      case 2: // Delete
        url = "http://127.0.0.1:8000/api/diet/delete";
        method = "DELETE";
        myForm = {
            dietId:await fetchDietId(formObject.mealType, formObject.date),
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
      window.location.reload();
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

  const fetchDietId = async (mealType, date) => {
    try {
      // Replace 'DIET_API_ENDPOINT' with the actual endpoint of your Diet API
      let apiUrl = "http://127.0.0.1:8000/api/diet/getall/"+localStorage.getItem("UserID")
      const response = await axios.get(apiUrl);
      const data = response.data;
  
      function searchDietIdByMealAndDate(mealType, date) {
        for (const diet of data) {
          if (diet.mealType.toLowerCase() === mealType.toLowerCase() && diet.date === date) {
            return diet.dietId;
          }
        }
        return null; // Return null if the diet with the given meal type and date is not found
      }
  
      console.log(searchDietIdByMealAndDate(mealType, date));
      return searchDietIdByMealAndDate(mealType, date);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  async function updateValues() {
    const myForm = {
      dietId: editingRowId,
      mealType: editingRowName,
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
      const response = await axios.get(
        "http://127.0.0.1:8000/api/diet/getall/" +
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
                    Meal Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Protein
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Calories
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {apiData.map((item) => (
                  <tr key={item.dietId} className=" dark:bg-gray-800">
                    <th>{item.mealType}</th>
                    <td>
                      {editingRowId === item.dietId ? (
                        <input
                          className="text-white placeholder-yellow-300 bg-gray-700"
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
                    <td className="px-6 py-4">
                      {editingRowId === item.dietId ? (
                        <input
                          className="text-white placeholder-yellow-300 bg-gray-700"
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
                      {editingRowId === item.dietId ? (
                        <input
                          className="text-white placeholder-yellow-300 bg-gray-700"
                          placeholder={item.date}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      ) : (
                        item.date
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <button
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
                Add a new workout
              </h2>
              <form onSubmit={handleSubmit2} action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Meal Type
                    </label>
                    <input
                      type="text"
                      name="mealType"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="meal type"
                      required=""
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      calories
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
                  Add meal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setTask(1)} // Set task to  1 for Update
                >
                  Update meal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setTask(2)} // Set task to  2 for Delete
                >
                  Delete meal
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
