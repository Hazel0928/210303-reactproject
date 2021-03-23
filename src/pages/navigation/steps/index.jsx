import React, { Component } from 'react';
import { Button, Row, Col, Card, Icon, Steps, message } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import style from './index.less';

const { Step } = Steps;

let steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];

export default class StepsNavi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        };
    }

    next() {
        this.setState((preState) => {
            return {
                current: preState.current + 1
            };
        });
    }

    prev() {
        this.setState((preState) => {
            return {
                current: preState.current - 1
            };
        });
    }

    render() {
        let { current } = this.state;
        return (
            <div className='buttonWrap'>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="基本用法">
                            <Steps current={1}>
                                <Step title="Finished" description="This is a description." />
                                <Step title="In Progress" subTitle="08:00" description="This is a description." />
                                <Step title="Waiting" description="This is a description." />
                            </Steps>
                        </Card>
                        <Card title="步骤切换">
                            <Steps current={current}>
                                {steps.map((item) => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                            <div className={style.stepsContent}>{steps[current].content}</div>
                            <div className={style.stepsAction}>
                                {current < steps.length - 1 && (
                                    <Button type="primary" onClick={() => this.next()}>
                                        Next
                                    </Button>
                                )}
                                {current === steps.length - 1 && (
                                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                        Done
                                    </Button>
                                )}
                                {current > 0 && (
                                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                        Previous
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="迷你版">
                            <Steps size="small" current={1}>
                                <Step title="Finished" description="This is a description." />
                                <Step title="In Progress" subTitle="08:00" description="This is a description." />
                                <Step title="Waiting" description="This is a description." />
                            </Steps>
                        </Card>
                        <Card title="带图标的步骤条">
                            <Steps>
                                <Step status="finish" title="Login" icon={<UserOutlined />} />
                                <Step status="finish" title="Verification" icon={<SolutionOutlined />} />
                                <Step status="process" title="Pay" icon={<LoadingOutlined />} />
                                <Step status="wait" title="Done" icon={<SmileOutlined />} />
                            </Steps>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}