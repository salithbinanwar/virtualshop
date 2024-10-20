import { Link } from 'react-router-dom'

import errorImage from '../images/loader.gif'
const ErrorPage = () => {
  return (
    <div className="grid grid-row-3 place-items-center my-10">
      <h1 className="text-4xl font-bold ">Error 404</h1>
      <img
        src={errorImage}
        alt="fishing picture"
        className="place-items-center my-10"
      />
      <p className=" text-red-600 underline text-2xl">
        you stumbled on a wrong page dude
      </p>

      <Link
        className="bg-red-500 text-white px-2 py-2 rounded mt-5"
        to="/"
      >
        Go to home
      </Link>
    </div>
  )
}

export default ErrorPage
