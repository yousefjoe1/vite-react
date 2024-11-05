import { Dropdown, MenuProps, Space } from 'antd';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const items: MenuProps["items"] = [
    {
      label: <Link to="/mens">Men&apos;s Clothing</Link>,
      key: "0",
    },
    {
      label: <Link to="/womens">Women&apos;s Clothing</Link>,
      key: "1",
    },
    {
      label: <Link to="/shoes">shoes&apos;s Clothing</Link>,
      key: "3",
    },
  ];
  
  const ShopMenu = () => (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <button>
        <Space>
          Shop
          <ChevronDown className="ml-1 h-4 w-4 group-hover:text-indigo-600" />
        </Space>
      </button>
    </Dropdown>
  );

  export default ShopMenu