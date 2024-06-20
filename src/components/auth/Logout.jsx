import { logout as setLogout } from "../../redux/features/authSlice";
import { Button, Flex, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { ChakraProviders } from "../../providers";
import { useLogoutMutation } from "../../redux/features/authApiSlice";
import { useAppDispatch } from "../../redux/hooks";
import Spinner from "../common/Spinner";

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
    {isLoading ? <><Spinner/></>:<div onClick={handleLogout}>logout</div>}

    {/* // <ChakraProviders>
    //   <Flex alignItems={'center'} justifyContent={'space-between'}>
    //     <Button aria-label="logout" onClick={handleLogout}>
    //       Logout
    //     </Button>
    //   </Flex>
    // </ChakraProviders> */}
    </>
  )
}
