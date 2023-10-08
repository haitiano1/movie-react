import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { PlaySquareOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import UserAdmin from '../../pages/Admin/UserAdmin';
import MovieAdmin from '../../pages/Admin/MovieAdmin';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import AddMovie from '../../pages/Admin/AddMovie';
import EditMovie from '../../pages/Admin/EditMovie';

const { Sider, Content } = Layout;
const items = [
  {
    key: '/admin/user',
    icon: <UserOutlined />,
    label: 'Người dùng',
  },
  {
    key: '/admin/movie',
    icon: <PlaySquareOutlined />,
    label: 'Danh sách phim',
  },
  {
    key: '/admin/add-new',
    icon: <PlusCircleOutlined />,
    label: 'Thêm phim mới',
  }
];
export default function SiderAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('/admin/user'); // Mặc định chọn /admin/user
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const currentKey = location.pathname;
    setSelectedKey(currentKey);
  }, [location]);
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const handleMenuItemClick = (key) => {
    setSelectedKey(key);
    history.push(key);
  };

  return (
    <Layout >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          style={{ minHeight: '100vh' }}
          theme="light"
          selectedKeys={[selectedKey]}
          mode="inline"
        >
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => handleMenuItemClick(item.key)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* Hiển thị nội dung tương ứng với key đã chọn */}
          {selectedKey === '/admin/user' && <UserAdmin />}
          {selectedKey === '/admin/movie' && <MovieAdmin />}
          {selectedKey === '/admin/add-new' && <AddMovie />}

          {selectedKey.startsWith('/admin/movie/edit/') && (
        <EditMovie id={selectedKey.replace('/admin/movie/edit/', '')} />
      )}
        </Content>
      </Layout>
    </Layout>
  );
}
