import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,//级联选择
    Upload,
    Button,
    message
} from 'antd'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
import { LeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { reqCategory, reqCategorys, reqAddOrUpdateProduct } from '../../api'
const Item = Form.Item
const { TextArea } = Input
const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    },
];



//Product的添加和更新的子路由组件
export default class ProductAddUpdate extends Component {
    state = {
        options: [],
    }

    constructor(props) {
        super(props)

        //创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef()
        this.formRef = React.createRef()
        this.editor = React.createRef()
    }


    initOptions = async (categorys) => {
        //根据categorys数组生成options数组
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false,//不是叶子
        }))

        //如果是一个二级分类商品的更新
        const { isUpdate, product } = this
        const { pCategoryId, categoryId } = product
        if (isUpdate && pCategoryId !== '0') {
            //获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)
            //生成二级下拉列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,//是叶子
            }))
            //找到当前商品对应的一级option对象
            const targetOption = options.find(option => option.value === pCategoryId)
            //关联对应的一级option上
            targetOption.children = childOptions
        }

        this.setState({ options })
    }

    //异步获取一级/二级分类列表，并显示
    //async函数的返回值是一个新的promise对象，promise的结果和值由async结果来决定
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId)//{status:0,data:catogorys}
        // debugger;
        if (result.status === 0) {
            const categorys = result.data
            //如果是一级分类列表
            if (parentId === '0') {
                this.initOptions(categorys)
            } else {//二级列表
                return categorys  //返回二级列表 ==> 当前async函数返回的promise就会成功且value值为categorys
            }

        }
    }





    submit = () => {
        this.formRef.current.validateFields().then(async(values) => {
            //收集数据,并封装成product对象
            // 1. 收集数据, 并封装成product对象
            // debugger;
            const { name, desc, price, productDevide } = values
            let pCategoryId, categoryId
            if (productDevide.length === 1) {
                pCategoryId = '0'
                categoryId = productDevide[0]
            } else {
                pCategoryId = productDevide[0]
                categoryId = productDevide[1]
            }
            const imgs = this.pw.current.getImgs()
            const detail = this.editor.current.getDetail()

            const product = { name, desc, price, imgs, detail, pCategoryId, categoryId }

            // 如果是更新, 需要添加_id
            if (this.isUpdate) {
                product._id = this.product._id
            }
            console.log(product)
            // 2. 调用接口请求函数去添加/更新
            const result = await reqAddOrUpdateProduct(product)
            console.log(result)
            // 3. 根据结果提示
            if (result.status === 0) {
                message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
                this.props.history.goBack()
            }
        })
            .catch(errorInfo => {
                message.error(`${this.isUpdate ? '更新' : '添加'}商品失败！`)
                // message.error('失败')
            })
    }

    //用于加载下一级列表的回调函数
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        //显示loading
        targetOption.loading = true;

        //根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
        targetOption.loading = false
        if (subCategorys && subCategorys.length > 0) {
            //生成一个二级列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,//是叶子
            }))
            //关联到当前option上
            targetOption.children = childOptions
        } else {//当前选中的分类没有二级分类
            targetOption.isLeaf = true
        }
        // 更新options状态        
        this.setState({
            options: [...this.state.options]
        })
    }
    componentDidMount() {
        this.getCategorys('0')
    }
    componentWillMount() {
        //取出携带的state
        const product = this.props.location.state
        //保存是否是更新的标识
        this.isUpdate = !!product
        //保存商品（如果没有，保存空对象）
        this.product = product || {}
    }
    render() {
        const { isUpdate, product } = this
        const { pCategoryId, categoryId, imgs, detail } = product
        //用来接收级联分类ID的数组
        const categoryIds = []
        if (isUpdate) {
            //商品是一个一级分类的商品
            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }

        }
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <LeftOutlined style={{ fontSize: '20px' }} />
                </LinkButton>
                <span>{isUpdate ? "修改商品" : "添加商品"}</span>
            </span>
        )
        //指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 2 },//左侧label的宽度
            wrapperCol: { span: 8 },//右侧包裹的宽度
        }
        return (
            <div>
                <Card title={title}>
                    <Form {...formItemLayout}
                        ref={this.formRef}
                    >
                        <Item label="商品名称" name='name'
                            initialValue={this.product.name}
                            rules={[
                                {
                                    required: true,
                                    message: '必须输入',
                                },

                            ]}>
                            <Input placeholder="请输入商品名称" />
                        </Item>
                        <Item label="商品描述" name="desc"
                            initialValue={product.desc}
                            rules={[
                                {
                                    required: true,
                                    message: '必须输入商品描述',
                                },

                            ]}>
                            <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }} />
                        </Item>
                        <Item label="商品价格" name="price"
                            initialValue={product.price}
                            rules={[
                                {
                                    required: true,
                                    message: '必须输入商品价格',
                                },
                                {
                                    validator: async (_, value) => {
                                        if (value > 0) {
                                            return Promise.resolve()
                                        } else return Promise.reject(new Error('价格必须大于0'))
                                    },
                                },

                            ]}>
                            <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
                        </Item>
                        <Item label="商品分类" name="productDevide" placeholder="请指定商品分类"
                            initialValue={categoryIds}
                            rules={[
                                {
                                    required: true,
                                    message: '必须指定商品分类',
                                },

                            ]}>
                            <Cascader
                                options={this.state.options} //需要显示的列表数据数组
                                loadData={this.loadData} //当选择某个列表项，加载下一级列表的监听回调
                            />
                        </Item>
                        <Item label="商品图片" >
                            <PicturesWall ref={this.pw} imgs={imgs} />
                        </Item>
                        <Item label="商品详情" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
                            <RichTextEditor ref={this.editor} detail={detail} />
                        </Item>
                        <Item label="提交按钮" >
                            <Button type="primary" onClick={this.submit}>提交</Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
