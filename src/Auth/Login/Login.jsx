import { Link } from "react-router-dom";
import images from "../../assets/images";
import useAuthContext from "../../Hooks/useAuthContext";
import Swal from "sweetalert2";

const Login = () => {

  const { loginUser } = useAuthContext();

  const userSignIn = (e) => {
    e.preventDefault()
    const from = new FormData(e.target)
    const email = from.get('email')
    const password = from.get('password')
    console.log(email, password)

    // user sign in logic here
    loginUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        Swal.fire({
          icon: 'success',
          title: 'Account Created',
          text: 'Your account has been created successfully',
        }).then(() => {
          window.location.href = '/'
        })
      })

  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Logo Section */}
        <div className="flex justify-center">
        <Link to='/'>
         <img
            src={images?.image?.logo}
            alt="Logo"
            className="h-16 w-auto object-contain"
          />
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={userSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 outline-none w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 outline-none w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password and Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-orange-500 hover:text-orange-600">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md focus:ring-4 focus:ring-orange-300 focus:outline-none transition duration-200"
          >
            Sign In
          </button>

          {/* Additional Links */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to='/register' className="text-orange-500 hover:text-orange-600 font-medium">
              Register now
            </Link>
          </div>
        </form>
      {/* </div> */}
    </div>
  );
};

export default Login;







