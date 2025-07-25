import React from 'react'
import { Link } from 'react-router-dom'
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import axios from 'axios'
import { Api } from '../config/api'


import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"



import { Button } from "@/components/ui/button"
import { Formik, useFormik } from 'formik';
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








const Table1 = ({ data, GetData }) => {
    const [goal, setGoal] = React.useState(350)

    function onClick() {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    }
    async function deleteUs(id) {
        try {
            await axios.delete(`${Api}?id=${id}`)
            GetData()
        } catch (error) {
            console.error("Failed to delete:", error)
        }
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            id: null
        },

        onSubmit: async (values) => {
            const edObj = {
                name: values.name,
                description: values.description,
                id: values.id,
            }
            try {
                await axios.put(`${Api}`, edObj)
                GetData()
            } catch (error) { console.error(error) }

        }

    })

    return (
        <div className="w-[95%] max-w-6xl mx-auto mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-white border border-white/10 backdrop-blur-2xl">
            <table className="min-w-full bg-white/5 border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
                <thead className="text-left uppercase tracking-wider text-gray-300 bg-white/10">
                    <tr>
                        <th className="py-4 px-6 border-b border-white/10">👤 Name</th>
                        <th className="py-4 px-6 border-b border-white/10">⚡ Status</th>
                        <th className="py-4 px-6 text-center border-b border-white/10">🗑️ Actions</th>
                        <th className="py-4 px-6 text-center border-b border-white/10">ℹ️ Info</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="py-10 text-center text-gray-400 text-lg italic">
                                🚫 No data found.
                            </td>
                        </tr>
                    ) : (
                        data.map((e) => (
                            <tr key={e.id} className="hover:bg-white/10 transition-all duration-300 ease-in-out">
                                <td className="py-4 px-6 border-b border-white/10 text-white font-semibold">
                                    <div className='flex items-center justify-around'>
                                        {e.name}
                                        {e.images.map((el) =>
                                            <img
                                                key={el.id}
                                                src={`https://to-dos-api.softclub.tj/images/${el.imageName}`}
                                                alt=""
                                                className='w-16 h-16 object-cover rounded-md border'
                                            />
                                        )

                                        }
                                    </div>
                                </td>

                                <td className="py-4 px-6 border-b border-white/10">
                                    <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300 border-emerald-300">
                                        ✅ Active
                                    </Badge>
                                </td>

                                <td className="py-4 px-6 border-b border-white/10 text-center">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <InteractiveHoverButton className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg shadow-red-900/40 transition duration-200">
                                                🗑 Delete
                                            </InteractiveHoverButton>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-white text-black">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. You are about to delete this user.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteUs(e.id)} className="bg-red-600 text-white hover:bg-red-700">
                                                    Confirm Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                    <Drawer>
                                        <DrawerTrigger asChild className="ml-[20px]">
                                            <InteractiveHoverButton onClick={() => { formik.setFieldValue("description", e.description), formik.setFieldValue("name", e.name), formik.setFieldValue("id", e.id) }}
                                                className="text-black bg-green-400">
                                                Edit
                                            </InteractiveHoverButton>
                                        </DrawerTrigger>
                                        <DrawerContent>
                                            <div className="mx-auto w-full max-w-sm">
                                                <form onSubmit={formik.handleSubmit}>

                                                    <DrawerHeader>
                                                        <div className="space-y-5 max-w-md mx-auto">
                                                            <div className="relative">
                                                                <input
                                                                    value={formik.values.name}
                                                                    type="text"
                                                                    name='name'
                                                                    onChange={formik.handleChange}
                                                                    id="input1"
                                                                    placeholder=""
                                                                    className="w-full px-4 pt-5 pb-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
                                                                />
                                                                <label
                                                                    htmlFor="input1"
                                                                    className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                                                                >
                                                                    Your name
                                                                </label>
                                                            </div>

                                                            <div className="relative">
                                                                <input
                                                                    value={formik.values.description}
                                                                    onChange={formik.handleChange}
                                                                    type="text"
                                                                    id="input3"
                                                                    placeholder=""
                                                                    name='description'
                                                                    className="w-full px-4 pt-5 pb-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
                                                                />
                                                                <label
                                                                    htmlFor="input3"
                                                                    className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                                                                >
                                                                    description
                                                                </label>
                                                            </div>



                                                        </div>

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
                                    </Drawer >
                                </td>

                                <td className="py-4 px-6 border-b border-white/10 text-center">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link to={`/user/${e.id}`}>
                                                <InteractiveHoverButton className="bg-sky-500/80 hover:bg-sky-600 text-white px-4 py-2 rounded-xl shadow-lg shadow-sky-900/40 transition duration-200">
                                                    ℹ️ Info
                                                </InteractiveHoverButton>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent className="text-white bg-black">
                                            View user details
                                        </TooltipContent>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table1
