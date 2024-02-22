"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { deleteData, putData, postData } from "../../../utils/apiCall";

function Page() {
  const [apiData, setApiData] = useState([]);
  const [task, setTask] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowName, setEditingRowName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [date, setDate] = useState("");

  async function updateValues() {
    const myForm = {
      parameterId: editingRowId,
      weight: weight,
      height: height,
      date: date,
    };

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
        `http://127.0.0.1:8000/api/parameter/getall/${localStorage.getItem(
          "UserID"
        )}`
      );
      const data = response.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (parameterId) => {
    const response = await deleteData(
      "http://127.0.0.1:8000/api/parameter/delete",
      { parameterId: parameterId }
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
      userId: localStorage.getItem("UserID"),
      weight: myForm.weight,
      height: myForm.height,
      date: myForm.date,
    };

    const { data, error } = await postData(
      "http://127.0.0.1:8000/api/parameter/add",
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
    <div className="bg-background-950 w-full  text-white">
      <div
        className={`flex w-full xl:w-3/4 xl:mx-auto  gap-2 p-3  justify-evenly h-full${
          isEditing ? "flex-col" : ""
        }`}
      >
        <div
          className={`  rounded-xl    overflow-auto ${
            isEditing ? "w-full" : "w-3/4 max-h-[85vh]"
          }`}
        >
          <div className="relative overflow-x-auto rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-white  rounded-xl">
              <thead className=" text-gray-100 capitalize  font-bold bg-background-800  ">
                <tr>
                  <th
                    scope="col"
                    className=" text-center p-3 border-r border-background-600 "
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className=" text-center p-3 border-r border-background-600 "
                  >
                    Weight
                  </th>
                  <th
                    scope="col"
                    className=" text-center p-3 border-r border-background-600 "
                  >
                    Height
                  </th>
                  <th
                    scope="col"
                    className=" text-center p-3 border-r border-background-600 "
                  >
                    Actions
                  </th>

                  <th
                    scope="col"
                    className=" text-center p-3  border-background-600 "
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {apiData.map((item) => (
                  <tr
                    key={item.parameterId}
                    className="dark:bg-background-900 dark:text-white text-center"
                  >
                    <td className="border-r border-background-600 border-t">
                      {editingRowId === item.parameterId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white  placeholder:font-medium outline-none"
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
                    <td className="border-r border-background-600 border-t">
                      {editingRowId === item.parameterId ? (
                        <input
                          className="w-max rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
                          name="weight"
                          type="number"
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
                      {editingRowId === item.parameterId ? (
                        <input
                          className=" rounded  px-4 py-2 text-center bg-slate-700 text-white placeholder:text-white placeholder:font-medium outline-none"
                          name="height"
                          type="number"
                          placeholder={item.height}
                          onChange={(e) => {
                            setHeight(e.target.value);
                          }}
                        />
                      ) : (
                        item.height
                      )}
                    </td>
                    <td className=" border-background-600 border-t p-4 border-r">
                      <button
                        onClick={() => {
                          setEditingRowId(item.parameterId);
                          setDate(item.date);
                          setWeight(item.weight);
                          setHeight(item.height);
                          setIsEditing(true);
                        }}
                        className="bg-blue-600 px-6 py-1 rounded text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    </td>
                    <td className=" border-background-600 border-t p-4 ">
                      <button
                        onClick={() => {
                          handleDelete(item.parameterId);
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
            <div className="  p-2 flex items-center gap-4">
              <button
                className=" text-sm font-medium px-4 py-2 text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200
                 dark:focus:ring-primary-900 hover:bg-background-800"
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
                  setWeight();
                  setHeight();
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
          <section className="bg-white dark:bg-background-900 rounded-xl">
            <div className="  rounded-md  w-full flex flex-col items-start ">
              <h2 className=" text-xl font-bold   text-center w-full dark:text-white pb-3 px-4 pt-3 border-b border-background-800  rounded-t-md">
                Add a new Parameter
              </h2>
              <form
                onSubmit={handleAdd}
                action="#"
                className="flex flex-col w-full justify-center p-4"
              >
                <div className=" ">
                  <div className="w-full my-2">
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium  dark:text-white"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="brand"
                      className="bg-background-800   text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 border-none"
                      placeholder="date"
                      required={true}
                    />
                  </div>
                  <div className="w-full  my-2">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium "
                    >
                      Weight in kgs
                    </label>
                    <input
                      type="number"
                      name="weight"
                      step="any"
                      id="price"
                      className="bg-background-800   text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 border-none"
                      placeholder="30"
                      required=""
                    />
                  </div>
                  <div className="w-fullmy-2">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium "
                    >
                      Height in cm
                    </label>
                    <input
                      type="number"
                      step="any"
                      name="height"
                      id="price"
                      className="bg-background-800   text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 border-none"
                      required
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full px-3 py-2    font-bold  text-center text-white bg-primary-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-700"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Page;
