import React, { Component } from 'react'
import {
    Card,
    Button
} from 'antd'
import ReactEcharts from 'echarts-for-react'

export default class Pie extends Component {
    state = {
        sales:[5, 20, 36, 10, 10, 20],//销量的数组
        stores:[5, 50, 45, 46, 10, 20]//库存的数组
    }
    //返回柱状图的配置对象
    getOption = (sales,stores) => {
        return  {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 1048, name: '搜索引擎'},
                        {value: 735, name: '直接访问'},
                        {value: 580, name: '邮件营销'},
                        {value: 484, name: '联盟广告'},
                        {value: 300, name: '视频广告'}
                    ]
                }
            ]
        };
    }

    render() {
        const {sales,stores} = this.state
        return (
            <div>
                <Card title="饼图">
                    <ReactEcharts option={this.getOption(sales,stores)} />
                </Card>
            </div>
        )
    }
}
