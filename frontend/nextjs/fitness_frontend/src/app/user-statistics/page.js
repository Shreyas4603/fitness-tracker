"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
function page() {
  const [apiData, setapiData] = useState([]);
  const [task, setTask] = useState(null); // Add state for task
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowName, setEditingRowName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [date, setDate] = useState("");

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    let url, method;
    let myForm = formObject;
    //console.log(myForm);
    switch (task) {
      case 0: // Add
        url = "http://127.0.0.1:8000/api/parameter/add";
        method = "POST";
        myForm = {
          userId: localStorage.getItem("UserID"),
          weight: myForm.weight,
          height: myForm.height,
          date: myForm.date,
        };
        break;
      case 1: // Update
        url = "http://127.0.0.1:8000/api/parameter/update";
        method = "PUT";
        myForm = {
          parameterId:await fetchParamID(myForm.date),
          weight: myForm.weight,
          height: myForm.height,
          date: myForm.date,
        };
        break;
      case 2: // Delete
        url = "http://127.0.0.1:8000/api/parameter/delete";
        method = "DELETE";
        myForm = {
          parameterId:await fetchParamID(myForm.date),
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

      window.location.reload();
      if (!response.data) {
        throw new Error("Network response was not ok");
      }
      else(response.data)
      {
        window.location.reload();
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
  async function fetchParamID(date) {
    try {
      // Replace 'API_ENDPOINT' with the actual endpoint of your API
      let apistr =
        "http://127.0.0.1:8000/api/parameter/getall/" +
        localStorage.getItem("UserID");
      const response = await axios.get(apistr);
      const data = response.data;
      function searchParamsIdByDate(date) {
        for (const params of data) {
        //  console.log(date,"date")
          if (params.date === date) {
            return params.parameterId;
          }
        }
        return null; // Return null if WorkoutName is not found
      }
    
      return searchParamsIdByDate(date);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  async function updateValues() {
    const myForm = {
      parameterId: editingRowId,
      weight: weight,
      height: height,
      date: date,
    };
    console.log(myForm, "updated");
    // Post the form data to your API route using Axios

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/parameter/update",
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
        error.detail
      );
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/parameter/getall/" +
          localStorage.getItem("UserID")
      );
      const data = response.data;
 
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
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Weight
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Height
                  </th>

                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {apiData.map((item) => (
                  <tr key={item.parameterId} className="dark:bg-gray-800 dark:text-gray-400">
                    <td>
                      {editingRowId === item.parameterId ? (
                        <input
                          className="text-white placeholder-yellow-100 bg-gray-700"
                          name="date"
                          placeholder={item.date}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      ) : (
                        item.date
                      )}
                    </td>
                    <td>
                      {editingRowId === item.parameterId ? (
                        <input
                          className="text-white placeholder-yellow-100 bg-gray-700"
                          name="weight"
                          placeholder={item.weight}
                          onChange={(e) => {
                            setWeight(e.target.value);
                          }}
                        />
                      ) : (
                        item.weight
                      )}
                    </td>
                    <td>
                      {editingRowId === item.parameterId ? (
                        <input
                          className="text-white placeholder-yellow-100 bg-gray-700"
                          name="height"
                          placeholder={item.height}
                          onChange={(e) => {
                            setHeight(e.target.value);
                          }}
                        />
                      ) : (
                        item.height
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => {
                          setEditingRowId(item.parameterId);
                          setDate(item.date);
                          setWeight(item.weight);
                          setHeight(item.height);
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
              <button
                className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
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
                Add a new Parameter
              </h2>
              <form onSubmit={handleSubmit2} action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Date
                    </label>
                    <input
                      type="text"
                      name="date"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="date"
                      required=""
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Weight in kgs
                    </label>
                    <input
                      type="number"
                      name="weight"
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
                      height in cm
                    </label>
                    <input
                      type="number"
                      step="any"
                      name="height"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="type 0 if not applicable"
                      required=""
                    />
                  </div>

                </div>

                <button
                  type="submit"
                  className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setTask(0)} // Set task to  0 for Add
                >
                  Add Parameter
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setTask(1)} // Set task to  1 for Update
                >
                  Update Parameter
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center mx-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setTask(2)} // Set task to  2 for Delete
                >
                  Delete Parameter
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
