import { Footer } from "../components/Footer"
import { NAvbar } from "../components/NAvbar"
import {Outlet} from "react-router-dom"
export const Main = () => {
  return (
    <div className="flex flex-col">
        <NAvbar/>
        <div className="flex-1">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
