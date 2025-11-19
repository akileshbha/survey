"use client";

import { useForm } from 'react-hook-form';
import { createUser, getUsers, updateUser, deleteUser } from "@/lib/actions";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation'
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
const BaltimoreMap = dynamic(() => import("@/components/BaltimoreMap"), {
    ssr: false,
});


const metadata: Metadata = {
    title: 'Results',
    description: 'Baltimore Form Survey results page',
    metadataBase: new URL('https://akilesh.in'),
};
type User = {
    id: number;
    name: string;
    age: number;
    email: string;
};

export default function Results() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);

    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        getUsers().then(setUsers);
    }, []);
    console.log('users', users)

    return (
        <>
            {/* Map Section */}
            <div className="max-w-5xl mx-auto mt-10">
                <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        Baltimore Map
                    </h2>
                    <div className="h-[500px] rounded-xl overflow-hidden border">
                        <BaltimoreMap />
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-4xl mx-auto mt-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Results
                </h1>

                <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
                    <ul className="mt-5 space-y-3">
                        {users.map((user) => (
                            <li
                                key={user.id}
                                className="flex justify-between items-center bg-gray-50 
                                   border border-gray-200 p-4 rounded-lg"
                            >
                                <div className="text-gray-800 font-medium">
                                    {user.name}
                                </div>

                                {/* <div className="flex gap-3">
                                    <button
                                        onClick={() => updateUser(user.id, "Updated Name", user.email)}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg 
                                           hover:bg-yellow-600 transition"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg 
                                           hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </div> */}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Submit Another Form Link */}
                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Submit Another Form
                    </Link>
                </div>
            </div>
        </>
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     <input type="text" placeholder="First name" {...register("First name", { required: true, maxLength: 80 })} />
        //     <input type="text" placeholder="Last name" {...register("Last name", { required: true, maxLength: 100 })} />
        //     <input type="text" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
        //     <input type="tel" placeholder="Mobile number" {...register("Mobile number", { required: true, minLength: 6, maxLength: 12 })} />
        //     <select {...register("Title", { required: true })}>
        //         <option value="Mr">Mr</option>
        //         <option value="Mrs">Mrs</option>
        //         <option value="Miss">Miss</option>
        //         <option value="Dr">Dr</option>
        //     </select>

        //     <input {...register("Developer", { required: true })} type="radio" value="Yes" />
        //     <input {...register("Developer", { required: true })} type="radio" value="No" />

        //     <input type="submit" />
        // </form>
    );
}