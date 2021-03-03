import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message,
} from 'antd'
import LinkButton from '../../components/link-button'
import { PlusOutlined} from '@ant-design/icons';
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
const Option = Select.Option
//Product的默认子路由
export default class ProductHome extends Component {
    state={
        products:[],//商品数组
        total:0,//商品总数量
        loading:false,
        searchName:'',//搜索的关键字
        searchType:'productName'//搜索的类型
    }
    //初始化table的列的数组
    initColumns=()=>{
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render:(price)=> '$'+price//当前制定了对应的属性，传入的是对应的属性值
              },
              {
                width: 100,
                title: '状态',
                // dataIndex: 'status',
                render: (product) => {
                  const {status, _id} = product
                  const newStatus = status===1 ? 2 : 1
                  return (
                    <span>
                      <Button
                        type='primary'
                        onClick={() => this.updateStatus(_id, newStatus)}
                      >
                        {status===1 ? '下架' : '上架'}
                      </Button>
                      <span>{status===1 ? '在售' : '已下架'}</span>
                    </span>
                  )
                }
              },
              {
                title: '操作',
                render:(product)=> {//当前制定了对应的属性，传入的是对应的属性值
                    return (
                        <span>
                            {/* 将product对象使用state传递给目标路由子件 */}
                            <LinkButton onClick={()=>this.props.history.push('/product/detail',{product})} >详情</LinkButton>
                            <LinkButton onClick={()=>this.props.history.push('/product/addupdate',product)}>修改</LinkButton>
                        </span>
                    )
                },
              },
          ];
    }
    //获取指定页码的列表数据显示
    getProducts=async(pageNum)=>{
        this.pageNum = pageNum//保存pageNum，让其他方法可以看到
        this.setState({
            loading:true,
        })
        const {searchName,searchType} = this.state
        //如果搜索关键字有值，就应该做搜索分页
        let result
        if(searchName){
            result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
        } else {//一般分页请求
            result = await reqProducts(pageNum,3)
        }
        //隐藏loading
        this.setState({
            loading:false,
        })
        if(result.status === 0){
            //取出分页数据，更新状态，显示分页列表
            const {total,list} = result.data
            this.setState({
                total,
                products:list
            })
        }
    }

    //更新指定商品的状态
    updateStatus = async (productId, status) => {
        const result = await reqUpdateStatus(productId, status)
        if(result.status===0) {
          message.success('更新商品成功')
          this.getProducts(this.pageNum)
        }
      }

    componentWillMount(){
        this.initColumns()
    }
    componentDidMount(){
        this.getProducts('1')
    }
    render() {
        //取出状态数据
        const { products, total, loading, searchName, searchType } = this.state
        const title = (
            <span>
                <Select style={{ width: "150px" }} value={searchType}
                    onChange={value => { this.setState({ searchType: value }) }}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input style={{ width: '150px', margin: "0 15px" }} placeholder="关键字"
                    value={searchName} onChange={e => this.setState({ searchName: e.target.value })} />
                <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type="primary" onClick={()=>this.props.history.push('/product/addupdate')}>
                <PlusOutlined />
                添加商品
            </Button>
        )
        return (

            <div>
                <Card title={title} extra={extra}></Card>
                <Table bordered rowKey='_id' dataSource={products} columns={this.columns} loading={loading}
                    pagination={{
                        current:this.pageNum,
                        defaultPageSize: PAGE_SIZE,
                        total,
                        //onChange:(pageNum)=>{this.getProducts(pageNum)}与下面的语句等价
                        onChange: this.getProducts
                    }} />;
                {/* pagination中会传pageNum */}
            </div>
        )
    }
}
