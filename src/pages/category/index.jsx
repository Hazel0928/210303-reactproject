import React, { Component } from 'react'
import { Card, Table, Button, message,Modal } from 'antd'
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { reqCategorys,reqUpdateCategorys } from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form';

export default class Category extends Component {
    formRef = React.createRef()
    state = {
        categorys: [],//一级分类列表
        subcategorys: [],//二级分类列表
        loading: false,//是否正在获取数据
        parentId: '0',//当前需要显示的分类列表的parentId
        parentName: '',
        showStatus:0,//标识添加、更新的确认框是否显示，0：都不显示，1：显示添加，2：显示更新
    }

    //初始化table所有列的数组
    initColumns = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                key: 'action',
                width: 300,
                render: (category) => (//返回需要显示的界面标签
                    <span>
                        <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {
                            this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null
                        }
                    </span>
                ),
            },
        ];
    }
    getcategorys = async (parentId) => {

        //再发请求前，显示loading
        this.setState({
            loading: true
        })
        parentId = parentId || this.state.parentId
        //获取数据
        const result = await reqCategorys(parentId)
        //在请求完成后，隐藏loading
        this.setState({ loading: false })
        if (result.status === 0) {
            //取出分类数组，可能是一级也可能是二级的
            const categorys = result.data
            if (parentId === '0') {
                this.setState({
                    categorys: categorys,
                })
            } else {
                this.setState({
                    subcategorys: categorys,
                })
            }

        } else {
            message.error('获取分类列表失败')
        }
    }

    //显示一级分类对象的二级列表
    showSubCategorys = (category) => {
        //更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            console.log('parentId', this.state.parentId) // '0'
            // 获取二级分类列表显示
            this.getcategorys()
        })
    }

    //显示一级分类列表
    showFirstCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subcategorys: []
        })
    }

    //响应点击取消：隐藏确定框
    handleCancel=()=>{
        this.setState({
            showStatus:'0'
        })
    }

    //显示添加的确认框
    showAdd=()=>{
        this.setState({
            showStatus:'1'
        })
    }

    //添加分类
    addCategory=()=>{
        this.setState({
            showStatus:'0'
        })
    }

    showUpdate=(category)=>{
        this.category = category
        this.setState({
            showStatus:'2'
        })

    }

    //更新分类
    updateCategory=async ()=>{
        console.log('修改')
        //1.隐藏确定框
        this.setState({
            showStatus:0 
         })
         //准备数据
        const categoryId =this.category._id
        const categoryName = this.formRef.current.getFieldsValue().categoryName  //得到子组件传过来的值
        //  //2.发请求更新分类
        console.log(typeof(categoryName))
         const result=await reqUpdateCategorys({categoryId,categoryName})
         console.log(result)
         if(result.status===0){
             //3.重新显示列表
             console.log(1)
            this.getcategorys()
         }
      
         
    }



    //为第一次render准备数据
    componentWillMount() {
        this.initColumns()
    }
    //执行异步任务：发异步ajax请求
    componentDidMount() {
        this.getcategorys()//获取一级分类列表
    }

    render() {
        //读取状态数据
        const { categorys, loading, subcategorys, parentId, parentName,showStatus } = this.state
        //读取指定的分类
        const category = this.category || {} //如果还没有，指定一个空对象
        const title = parentId === '0' ? "一级分类管理" : (
            <span>
                <LinkButton onClick={this.showFirstCategorys}>一级分类管理</LinkButton>
                <RightOutlined />
                <span>{parentName}</span>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined />
                <span>添加</span>
            </Button>
        )
        
        return (
            <Card title={title} extra={extra} >
                {showStatus === '1' && (<Modal title="添加分类" visible={showStatus === '1'} onOk={this.addCategory} onCancel={this.handleCancel}>
                    <AddForm categorys={categorys}
                    parentId = {parentId}
                    setForm={form => this.form = form}/>
                </Modal>)}
                <Modal title="更新分类" visible={showStatus === '2'} onOk={this.updateCategory} onCancel={this.handleCancel}>
                    <UpdateForm key={Date.now()} categoryName={category.name} formRef={this.formRef}/>
                </Modal>
                <Table rowKey='_id' dataSource={parentId === '0' ? categorys : subcategorys} loading={loading}
                    columns={this.columns} bordered={true}
                    pagination={{ defaultPageSize: 5 }} />;
            </Card>

        )
    }
}
