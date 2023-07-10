import { Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const UserRoute=({component,mode})=>{
    let token=localStorage.getItem('usertoken');
    if(token){
        return component?component:<Dashboard  mode={mode}/>
    }else{
        return <Navigate to={'/'} replace></Navigate>
    }
}

export default UserRoute;