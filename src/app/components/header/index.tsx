import { logout } from "@/app/services/authService";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleGraphClick = () => {
    // Define the action for the Graph button click, e.g., navigate to a graph page
    router.push("/pages/graph"); // Update with the actual path
  };
  const handleHomeClick = () => {
    // Define the action for the Home button click, e.g., navigate to a home page
    router.push("/"); // Update with the actual path
  };

  return (
    <div className={styles.title}>
      <a className="navbar-brand" href="/">
      CredHive
      </a>
      <div className="flex space-x-2 bg-gray-800 p-4 rounded-lg">
  {/* Home Button */}
  <button
    className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:text-black bg-black hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    onClick={handleHomeClick}
  >
    Home
  </button>

  {/* Graphs Button */}
  <button
    className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:text-black hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    onClick={handleGraphClick}
  >
    Graph
  </button>

  {/* Logout Button */}
  <button
    className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    onClick={() => {
      logout();
      router.push("/pages/login");
    }}
  >
    Logout
  </button>
</div>

    </div>
  );
}
