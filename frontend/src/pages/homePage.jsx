import Navbar from "../components/navbar.jsx";
import { useContext } from "react";
import userContext from "../context/user.context.jsx";

function HomePage() {
  const { user } = useContext(userContext);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            SOEN - AI Software Developer
            {JSON.stringify(user.email)}
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            A clean and modern login/register UI built with React and Tailwind.
          </p>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
