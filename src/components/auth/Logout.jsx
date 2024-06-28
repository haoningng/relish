import { logout as setLogout } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../redux/features/authApiSlice";
import { useAppDispatch } from "../../redux/hooks";
import CustomSpinner from "../common/CustomSpinner";

export default function Logout() {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        toast.success('Logged out!');
        dispatch(setLogout());
      })
      .catch((e) => {
        const firstErrorMsg = Object.values(e.data)[0]
        toast.error('Failed to logout' + '\n' + firstErrorMsg);
      })
  };
  return (
    <>
    {isLoading ? <><CustomSpinner/></>:<div onClick={handleLogout}>Logout</div>}
    </>
  )
}
