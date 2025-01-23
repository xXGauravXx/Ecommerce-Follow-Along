import  { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import styles from "../Styles/styles.js"; // Ensure this is correctly used

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  const handleFileSubmit = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    axios
        .post("http://localhost:8000/api/v2/user/create-user", newForm, config)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
  };

  return (
      <div className="min-h-screen bg-gradient-to-bl from-red-500 to-yellow-400 px-6 py-12 flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-950">
            Register as a new user
          </h2>

        <div className="mt-8 sm:w-full sm:max-w-md justify-center">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 justify-center">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                      type={visible ? "text" : "password"}
                      name="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                  {visible ? (
                      <AiOutlineEye
                          className="absolute right-2 top-2 cursor-pointer"
                          size={25}
                          onClick={() => setVisible(false)}
                      />
                  ) : (
                      <AiOutlineEyeInvisible
                          className="absolute right-2 top-2 cursor-pointer"
                          size={25}
                          onClick={() => setVisible(true)}
                      />
                  )}
                </div>
              </div>

              {/* Avatar Upload */}
              <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                  Avatar
                </label>
                <div className="mt-2 flex items-center">
                <span className="inline-block h-9 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                      <img
                          src={URL.createObjectURL(avatar)}
                          alt="avatar"
                          className="h-full w-full object-cover rounded-full"
                      />
                  ) : (
                      <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                  <label
                      htmlFor="file-input"
                      className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span>Upload a file</span>
                    <input
                        type="file"
                        name="avatar"
                        id="file-input"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileSubmit}
                        className="sr-only"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                    type="submit"
                    className="w-full h-[40px] flex justify-center py-2 px-4 border text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>

              {/* Already Registered */}
              <div className={`${styles.normalFlex} w-full`}>
                <h4>Already have an account?</h4>
                <Link to="/login" className="text-blue-600 pl-2">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
  );
};

export default SignupPage;