import { Dropdown, MenuProps } from "antd";
import { LogIn, LogOut, User } from "lucide-react";
import { useEffect,  useState } from "react";
import { notLogedItems ,logedItems } from "./NavData";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const redirect = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("userToken");
    redirect('/')
};

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  const items: MenuProps["items"] = isLoggedIn ? [...logedItems,{
    
        label: (
          <button>logout</button>
        ),
        key: "3",
        onClick: ()=> {
            handleLogout()
        },
        icon: <LogOut  size={16}/>
      },
  ] : notLogedItems;
  
  const menuProps = {
    items,
  };

  return (
    <>
      <Dropdown menu={menuProps} trigger={["click"]}>
      <button className="flex items-center justify-center lg:w-8 lg:h-8 h-6 w-6 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-100 transition duration-150 ease-in-out">
          {isLoggedIn ? (
            <User className="lg:h-6 lg:w-6 w-5 h-5 text-gray-600" />
          ) : (
            <LogIn className="h-6 w-6 text-gray-600" />
          )}
        </button>
    </Dropdown>
    </>
  );
};

export default ProfileMenu;
