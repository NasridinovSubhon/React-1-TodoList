import axios from "axios"
import { useEffect, useState } from "react"
import { Api } from './config/api';
import Layout from "./layout/Layout";
import Table1 from "./pages/Table1";
import UserByid from './pages/UserByid';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import { Button } from "@/components/ui/button"


import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Formik, useFormik } from "formik";

const App = () => {

  const [data, setData] = useState([])

  async function GetData() {
    try {
      const { data } = await axios.get(Api)
      setData(data.data)
    } catch (error) { console.error(error) }
  }


  useEffect(() => { GetData() },
    [])


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Table1 data={data} GetData={GetData} />} />
        <Route path="user/:id" element={<UserByid />} />
      </Route>
    )
  )


  const [goal, setGoal] = useState(350)

  function onClick() {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }


  const formik = useFormik({
    initialValues: {
      Name: "",
      Images: "",
      Description: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const formDatta = new FormData()
      formDatta.append("Images", values.Images)
      formDatta.append("Name", values.Name)
      formDatta.append("Description", values.Description)

      try {
        await axios.post(Api, formDatta)
        GetData()
        resetForm()
      } catch (error) { console.error(error) }
    }
  })

  const handleChangeFile = (e) => {
    formik.setFieldValue("Images", e.target.files[0])
    console.log("in change", e.target.files[0]);

  }

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <InteractiveHoverButton className="m-[20px]" >
            Open Modal
          </InteractiveHoverButton>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <form onSubmit={formik.handleSubmit}>

              <DrawerHeader>
                <input
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                  type="text"
                  name="Name"
                  placeholder="Enter name..."
                  className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 placeholder:text-gray-500 transition-all duration-200 ease-in-out"
                />

                <input
                  onChange={handleChangeFile}
                  type="file"
                  name="Images"
                  className="w-full text-sm text-gray-600
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:bg-blue-100 file:text-blue-700
      hover:file:bg-blue-200
      transition-colors duration-200 ease-in-out"
                />

                <input
                  value={formik.values.Description}
                  onChange={formik.handleChange}
                  type="text"
                  name="Description"
                  placeholder="description..."
                  className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 placeholder:text-gray-500 transition-all duration-200 ease-in-out"
                />
              </DrawerHeader>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button type="submit" >Submit</Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </div>
        </DrawerContent>
      </Drawer>


      <RouterProvider router={router} />
    </div>
  )
}

export default App


