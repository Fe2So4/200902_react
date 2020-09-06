import React, { Component } from 'react'
import LinkButton from '../../components/link-button/index'
import {
    Card,
    Table,
    Button,
    Icon,
    message,
    Modal
} from 'antd'
import './category.less'
import { reqCategory, reqAddCategory, reqUpdateCategory} from '../../api/index'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'
export default class Category extends Component {
    state={
        loading:false,
        categorys:[], 
        subCategorys: [],
        parentId:'0',
        parentName:'',
        showStatus:0,
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getCategorys()
    }

    getCategorys = async() =>{
        this.setState({
            loading:true
        })
        const {parentId} = this.state
        const result = await reqCategory(parentId);
        // console.log(result)
        this.setState({
            loading:false
        })
        if (result.status === 0) {
            const categorys = result.data
            if(parentId === '0') {
                this.setState({
                    categorys
                })
            }else {
                this.setState({
                    subCategorys: categorys
                })
            }
            
        }else {
            message.error('请求失败')
        }
    }

    showSubCategorys = (category)=>{
        this.setState({
            parentId: category._id,
            parentName: category.name
        },()=>{
            this.getCategorys()
        })
        
    }
    showCategory = () =>{
        this.setState({
            parentId:'0',
            parentName:'',
            subCategorys:[]
        },()=>{
            this.getCategorys()
        })
    }
    initColumns = ()=>{
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <span>
                        <LinkButton onClick={() => { this.showUpdate(category)}}>修改分类</LinkButton>
                        {this.state.parentId === '0' ? <LinkButton onClick={() => { this.showSubCategorys(category) }}>查看子分类</LinkButton>:null}
                    </span>
                )
            }

        ]
    }
    showAdd = ()=>{
        this.setState({
            showStatus:1
        })
    }
    showUpdate = (category)=>{
        this.category = category
        this.setState({
            showStatus:2
        })
    }
    // 添加分类
    addCategory = async()=>{
        this.setState({
            showStatus: 0
        })
        const form = this.form
        const { parentId, categoryName} = form.getFieldsValue()
        form.resetFields() 
        const result = await reqAddCategory(categoryName,parentId)
        if(result.status === 0) {
            if(parentId === this.state.parentId) {
                this.getCategorys()
            }else if(parentId === '0') {
                
            }
        }
    }
    // 更新分类
    updateCategory= async()=>{
        // 隐藏框
        this.setState({
            showStatus: 0
        })
        // 发请求
        const categoryId = this.category._id
        const form = this.form
        const categoryName = form.getFieldValue('categoryName')
        form.resetFields()
        const result = await reqUpdateCategory({ categoryId, categoryName })
        if(result.status === 0) {
            // 重新渲染
            this.getCategorys()
        }
        
    }
    handleCancel = ()=>{
        // console.log(this.form)
        this.form.resetFields()
        this.setState({
            showStatus:0
        })
    }
    render() {
        const { parentId, parentName, showStatus, subCategorys} = this.state
        const category = this.category || {}
        const title = parentId === '0' ? '一级分类列表':(
            <span>
                <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
                <Icon style={{marginRight: 5}} type='arrow-right'></Icon>
                <span>{parentName}</span>
            </span>
        )
        const extra = (
            <Button onClick={this.showAdd} type='primary'>
                <Icon type='plus'></Icon>
                添加
            </Button>
        )
        const { categorys, loading} = this.state
        
        return (
            <Card title={title} extra={extra}>
                <Table
                    rowKey="_id"
                    bordered
                    loading={loading} 
                    dataSource={parentId === '0' ? categorys:subCategorys} 
                    columns={this.columns}
                    pagination={{defaultPageSize:5,showQuickJumper:true}}> 
                </Table>
                <Modal 
                    title='添加'
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    visible={showStatus===1}>
                    <AddForm 
                        setForm={(form) => { this.form = form }}
                        categorys={categorys} parentId={parentId}></AddForm>
                </Modal>
                <Modal
                    title='修改'
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                    visible={showStatus===2}>
                    <UpdateForm 
                        setForm = {(form)=>{this.form = form}}
                        categoryName={category.name}></UpdateForm>
                </Modal>
            </Card>
        )
    }
}