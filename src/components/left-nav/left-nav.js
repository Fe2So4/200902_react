import React,{Component} from 'react'
import { Link, withRouter} from 'react-router-dom'
import {Icon, Menu} from 'antd'
import './index.less'
import logo from '../../assets/logo.png'
import menuList from '../../config/menuConfig'

const SubMenu = Menu.SubMenu
class LeftNav extends Component {
    getMenuNodes = (menuList) =>{
        const path = this.props.location.pathname
        return menuList.map(item=>{
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem) {
                    this.openKey = item.key
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    };

    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {

        const path = this.props.location.pathname
        const openKey = this.openKey

        return (
            <div className='left-nav'>
                <Link to='/'>
                    <header className='left-nav-header'>
                        <img src={logo} alt="logo" />
                        <h1>后台管理</h1>
                    </header>
                </Link>
                <Menu mode='inline' theme='dark' selectedKeys={[path]} defaultOpenKeys={[openKey]}>
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)