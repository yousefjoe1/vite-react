import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    key: '1',
    type: 'group',
    label: '',
    children: [
      {
        key: '1-1',
        label: <Link title='On sale' to="/on-sale">On sale</Link>,
      },
      {
        key: '1-2',
        label: <Link title='New Arrivals' to="/new-arrivals">New Arrivals</Link>,
      },
      {
        key: '1-3',
        label: <Link title='Brands' to="/brands">Brands</Link>,
      },
    ],
  },
  {
    key: '2',
    label: 'Shop',
    children: [
      {
        key: '2-1',
        label: <Link to="/mens">Men&apos;s Clothing</Link>,
      },
      {
        key: '2-2',
        label: <Link to="/womens">Womens&apos;s Clothing</Link>,
      },
    ],
  },
];

const LeftLinks = () => (
  <Dropdown menu={{ items }} className='lg:hidden' trigger={["click"]}>
    <button>
    <Menu className="h-6 w-6" />
    </button>
  </Dropdown>
);

export default LeftLinks;