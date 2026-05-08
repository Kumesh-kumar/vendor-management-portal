import { NavLink, Outlet } from "react-router-dom"
import { FaBeer } from "react-icons/fa"

const Home = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 wrapper w-full">
            <div className="border-r border-gray-300 p-4 hidden sm:flex  flex-col gap-10 bg-green-300">
                <div className="flex items-center">
                    <span className="text-5xl mb-4">
                        <FaBeer />
                    </span>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">VendorHub</h1>
                        <p className="text-gray-600 text-lg">Enterprise ERP System</p>
                    </div>
                </div>
                <div className=" max-w-[500px] mx-auto flex flex-col  justify-center items-center mt-auto mb-auto ">
                    <h2 className=" font-bold mb-4 text-4xl">Streamline Your Vendor Management</h2>
                    <p className="text-gray-600 mb-4 text-xl">Complete end-to-end solution for managing vendors, purchase orders, invoices, and shipments in one unified platform.</p>
                </div>

            </div>
            <div className="flex flex-col ">
                <div className="flex justify-end p-5 gap-3  bg-gradient-to-br from-green-50 to-emerald-100">
                    <NavLink to={"login"} className={(e) => { return e.isActive ? "bg-green-300 px-2 py-1 rounded" : "border px-2 py-1 rounded" }}> Login</NavLink>
                    <NavLink to="register" className={(e) => { return e.isActive ? "bg-green-300 px-2 py-1 rounded" : "border px-2 py-1 rounded" }}>Register</NavLink>
                </div>
                <div >
                    <Outlet />
                </div>

            </div>

        </div>
    )
}

export default Home