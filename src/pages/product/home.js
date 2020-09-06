import React,{Component} from 'react'
import {
    Card,
    Select,
    Icon,
    Table,
    Button,
    Input
} from 'antd'
import LinkButton from '../../components/link-button/index'
import './product.less'
import { reqProducts} from '../../api/index'
const Option = Select.Option
export default class ProductHome extends Component{
    state= {
        product:[],
        total:0,
    }
    componentWillMount(){
        this.initColumns()
    }
    componentDidMount(){
        this.getProducts(1)
    }


    // 获取指定页面列表数据
    getProducts = async(pageNum) =>{
        const result = await reqProducts(pageNum,3);
        if(result.status === 0) {
            const {total,list} = result.data
            this.setState({
                total,
                product:list
            })
        }
    }
    initColumns = ()=>{
        this.columns = [
            {
                title:'商品名称',
                dataIndex:'name',
            },
            {
                title:'商品描述',
                dataIndex:'desc'
            },
            {
                title:'价格',
                dataIndex:'price',
                render: (price)=>{
                    return '￥' + price 
                }
            },{
                width:100,
                title:'状态',
                dataIndex:'status',
                render:(status)=>{
                    return (
                        <span>
                            <Button type='primary'>下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {   
                width: 100,
                title:'操作',
                render:(product)=>{
                    return (
                        <span>
                            <LinkButton>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            }
        ]
    }
    render() {
        const { product} = this.state
        const title = (
            <span>
                <Select value='1' style={{width:150}}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width:150,margin:'0 15px'}} ></Input>
                <Button type='primary'>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary'>
                <Icon type='plus'></Icon>
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table dataSource={product} 
                columns={this.columns}
                rowKey='_id'
                bordered
                ></Table>
            </Card>
        )
    }
}