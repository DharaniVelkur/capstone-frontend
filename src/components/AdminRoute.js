import { Navigate} from "react-router-dom";
import ImageUploadForm from "./ImageUploadForm";
import jwt_decode from 'jwt-decode';

const AdminRoute= ({component,mode})=>{
    let token=localStorage.getItem('usertoken');
    if (token) {
        try {
            let decodedToken=jwt_decode(token);
            if(decodedToken.email!=='admin@gmail.com'){
                localStorage.removeItem('usertoken');
                localStorage.removeItem('result');
                localStorage.removeItem('likedProducts')
                return <Navigate to={'/'} replace></Navigate>
            }
            return component?component:<ImageUploadForm mode={mode}/>
        } catch (e) {
            localStorage.removeItem('usertoken');
            localStorage.removeItem('result');
            localStorage.removeItem('likedProducts')

            return <Navigate to={'/'} replace></Navigate>
        };
       
    } else {
        return <Navigate to={'/'} replace></Navigate>
    }
};

export default AdminRoute;