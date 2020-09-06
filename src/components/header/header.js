import React,{Component} from 'react'
import {Modal,message} from 'antd'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import LinkButton from '../../components/link-button/index'
import './index.less'
class Header extends Component {
    logout = ()=>{
        Modal.confirm({
            content:'确定退出吗?',
            onOk:()=> {
                memoryUtils.user = {}
                storageUtils.removeUser()
                message.success('退出成功')
                setTimeout(()=>{
                    this.props.history.replace('/login')
                },1000)
                
            }
        })
    }
    getTitle = ()=>{
        const path = this.props.location.pathname
        let title
        menuList.forEach(item =>{
            if(item.key === path) {
                title = item.title
            }else if(item.children) {
                const cItem = item.children.find(cItem=>cItem.key === path)
                if(cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }
    render() {
        const {username} = memoryUtils.user
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎, {username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                    {/* <a href="javascript:" >退出</a> */}
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)