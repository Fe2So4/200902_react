import React, {Component} from 'react'
import {Redirect, Route,Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Home from '../home/Home'
import Product from '../product/product'
import Role from '../role/role'
import Category from '../category/category'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


const {Footer,Sider,Content} = Layout
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if(!user || !user._id) {
            return <Redirect to="/login"></Redirect> 
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>header</Header>
                    <Content style={{height:'100%',margin: 20,backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/charts/bar' component={Bar}></Route>
                            <Route path='/charts/line' component={Line}></Route>
                            <Route path='/charts/pie' component={Pie}></Route>
                            <Redirect to='/home'></Redirect>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#ccc'}}>footer</Footer>
                </Layout>
            </Layout>
        )
    }
}