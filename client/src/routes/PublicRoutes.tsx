import { Route, Routes } from "react-router"
import HomeScreen from "../screens/home/HomeScreen"
import EnrollApkScreen from "../screens/enrollApk/EnrollApkScreen"

const PublicRoutes = () => {
    return (
        <Routes>
            <Route index element={<HomeScreen />} />
            <Route path="enrollments" element={<EnrollApkScreen />} />
        </Routes>
    )
}

export default PublicRoutes