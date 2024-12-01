import React, { useEffect, useMemo, useState } from 'react';
// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

import { subApps } from '../constants';

const { Header, Content, Footer, Sider } = Layout;


const items = subApps.map(
  (item, index) => ({
    key: String(index + 1),
    // icon: React.createElement(icon),
    label: item.name,
    link: item.activeRule,
    entry: item.entry
  }),
);
const App: React.FC = () => {
  const [activeRule, setActiveRule] = useState<string>()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const handleClick = (e: any) => {
    console.log(items[Number(e.key) - 1].entry, 'link isbbb');
    setActiveRule(items[Number(e.key) - 1].entry)
    navigate(items[Number(e.key) - 1].link);
  };
  
  useEffect(() => {
    
  }, [])
  // const baseUrl = location.hostname
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} onClick={handleClick} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className="site-layout-background"
            id='container'
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
          </div>
          <div>
            <micro-app name="my-app" url={activeRule}></micro-app>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;