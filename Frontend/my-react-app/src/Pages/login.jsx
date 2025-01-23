import { useState } from "react";
import axios from "axios";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";




function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);




    const handleClickLogin = async (event) => {
      event.preventDefault();
      // Add Axios for login functionality
      console.log("email:", email, "password", password)

      try {
        const response = await axios.post("http://localhost:8000/api/v2/user/login-user", {
          email: email,
          password: password
        })
        console.log(response.data)
      } catch (err) {
        console.log("Error", err)
      }
    };

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-12">
          <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">Sign in to your account</h2>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleClickLogin}>
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
                <div className="text-right mt-2">
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                      type="checkbox"
                      id="rememberMe"
                      className="mr-2"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

          </div>


          {/* Sign In Button */}
          <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign in
          </button>
        </form>
</div>
</div>
)
  ;
}


export default LoginPage;