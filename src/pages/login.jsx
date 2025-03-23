import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("📤 Sending Data:", data);

    try {
        const response = await fetch("http://localhost:3000/", { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) 
        });

        // ✅ Parse JSON Response
        const result = await response.json();

        if (response.ok) {
            console.log("✅ Data received:", result.user, result.message);
            if (result.user.type == "user"){
                navigate("/home");
            }
            else if (result.user.type == "admin"){
                navigate("/adminlogin");
            }
            else{
                console.log("No type send")
            }
        } else {
            console.log("❌ Data not sent:", result.message);
        }

    } catch (error) {
        console.error("❌ Error:", error);
    }
};


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div className="mt-2">
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                id="email"
                autoComplete="email"
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
             
            </div>
            <div className="mt-2">
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                id="password"
                autoComplete="current-password"
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

      
      </div>
    </div>
  );
};

export default Login;
