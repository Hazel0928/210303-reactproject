import {
    HomeOutlined,
    FolderOutlined ,
    FolderOpenOutlined,
    UserOutlined,
    TeamOutlined,
    AreaChartOutlined,
    LineChartOutlined,
    BarChartOutlined,
    PieChartOutlined,
    BulbOutlined
  } from '@ant-design/icons';
const menuList = [
    {
        title: '首页',//菜单标题名称
        key: '/home',//对应的path
        icon: <HomeOutlined/> ,//图标名称
        isPublic:true,//公开的
    },
    {
        title: '基本组件',
        key: '/basic',
        icon: <FolderOutlined/>,
        children: [
            //子菜单列表
            {
                title: '按钮',
                key: '/basic/button',
                icon: <FolderOpenOutlined/> 
            },
            {
                title: '图标',
                key: '/basic/icon',
                icon: <FolderOpenOutlined/> 
            },
        ]
    },
    {
        title: '权限管理',
        key: '/authority',
        icon: <TeamOutlined/>
    },
    {
        title: '关于',//菜单标题名称
        key: '/about',//对应的path
        icon: <HomeOutlined/> ,//图标名称
    },
    {
        title: '导航组件',
        key: '/navigation',
        icon: <UserOutlined/> ,
        children:
            [{
                title: '下拉菜单',
                key: '/navigation/dropdown',
                icon: <BarChartOutlined/>
            },
            {
                title: '导航菜单',
                key: '/navigation/menu',
                icon: <LineChartOutlined/>
            },
            {
                title: '步骤条',
                key: '/navigation/steps',
                icon: <PieChartOutlined/>
            },
            ]
    },
    {
        title: '图形图表',
        key: '/charts',
        icon: <AreaChartOutlined />,
        children:
            [{
                title: '柱形图',
                key: '/charts/bar',
                icon: <BarChartOutlined/>
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: <LineChartOutlined/>
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: <PieChartOutlined/>
            },
            ]
    },
    {
        title: '其他',
        key: '/othes',
        icon: <BulbOutlined />,
        children:
            [{
                title: '404',
                key: '/others/404',
            },
            {
                title: '403',
                key: '/others/403',
            },
            {
                title: '500',
                key: '/others/500',
            },
            ]
    },
]
export default menuList
