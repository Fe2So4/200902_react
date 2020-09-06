import React, {Component} from 'react'
import  './login.less'
import logo from './images/logo.png'
import {
    Form,
    Icon,
    Input,
    Button,
    message
} from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqLogin} from './../../api/index'
import { Redirect } from 'react-router-dom'

const FormItem = Form.Item

class Login extends Component{
    handleSubmit(event) {
        event.preventDefault()

        this.props.form.validateFields(async(err,values)=>{
            if(!err) {
                const {username, password} = values;
                const result = await reqLogin(username, password)
                if(result.status === 0) {
                    message.success('登陆成功')
                    const user = result.data
                    memoryUtils.user = user
                    storageUtils.saveUser(user)
                    this.props.history.replace('/')
                }else {
                    message.error('登陆失败')
                }
            }else { 
                message.error('校验失败')
            }
        })
    }

    validatePwd = (rule, value, callback) => {
        if(!value) {
            callback("用户名不能为空")
        }else if(value.length < 4){
            callback("用户名长度不能小于4")
        }else if(value.length > 12) {
            callback("用户名长度不能大于12")
        }else {
            callback()
        }
    }

    render() {
        const user = memoryUtils.user
        if(user && user._id) {
            return <Redirect to="/"></Redirect>
        }
        const form = this.props.form
        const {getFieldDecorator} = form
        return(
            <div className="login">
                <header className='login-header'>
                    <img src={logo} alt=""/>
                    <h1>React项目:后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit.bind(this)}  className="login-form">
                        <FormItem>
                            {getFieldDecorator('username',{
                                rules:[
                                    {
                                        validator: this.validatePwd
                                    }
                            ],
                            })(
                                <Input
                                    prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入用户名"
                                ></Input>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }],
                            })(
                                <Input
                                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                ></Input>
                            )}
                           
                        </FormItem>
                        <FormItem>
                            <Button type='primary' htmlType="submit" className="login-form-button">登陆</Button>
                        </FormItem>
                    </Form>
                </section>
            </div>
        ) 
    }
}

const WrapLogin = Form.create()(Login)
export default WrapLogin 