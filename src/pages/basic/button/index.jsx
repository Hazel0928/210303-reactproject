import React, { Component } from 'react';
import { Button, Row, Col, Card, Radio, Tooltip } from 'antd';
import { DownloadOutlined, PoweroffOutlined, SearchOutlined } from '@ant-design/icons';
import './index.less'

export default class BasicButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'large',
            loadings: [],
        };
    }
    enterLoading = index => {
        this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[index] = true;

            return {
                loadings: newLoadings,
            };
        });
        setTimeout(() => {
            this.setState(({ loadings }) => {
                const newLoadings = [...loadings];
                newLoadings[index] = false;

                return {
                    loadings: newLoadings,
                };
            });
        }, 6000);
    };
    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    };

    render() {
        let { size, loadings } = this.state;
        return (
            <div className="buttonWrap">
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="按钮类型">
                            <Button type="primary">Primary Button</Button>
                            <Button>Default Button</Button>
                            <Button type="dashed">Dashed Button</Button>
                            <br />
                            <Button type="text">Text Button</Button>
                            <Button type="link">Link Button</Button>
                        </Card>
                        <Card title="按钮尺寸">
                            <Radio.Group value={size} onChange={this.handleSizeChange}>
                                <Radio.Button value="large">Large</Radio.Button>
                                <Radio.Button value="default">Default</Radio.Button>
                                <Radio.Button value="small">Small</Radio.Button>
                            </Radio.Group>
                            <br />
                            <br />
                            <Button type="primary" size={size}>
                                Primary
                             </Button>
                            <Button size={size}>Default</Button>
                            <Button type="dashed" size={size}>
                                Dashed
                            </Button>
                            <br />
                            <Button type="link" size={size}>
                                Link
                            </Button>
                            <br />
                            <Button type="primary" icon={<DownloadOutlined />} size={size} />
                            <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
                            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
                            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
                                Download
                             </Button>
                            <Button type="primary" icon={<DownloadOutlined />} size={size}>
                                Download
                             </Button>
                        </Card>
                        <Card title="加载中状态">
                            <Button type="primary" loading>
                                Loading
                            </Button>
                            <Button type="primary" size="small" loading>
                                Loading
                            </Button>
                            <Button type="primary" icon={<PoweroffOutlined />} loading />
                            <br />
                            <Button type="primary" loading={loadings[0]} onClick={() => this.enterLoading(0)}>
                                Click me!
                            </Button>
                            <Button
                                type="primary"
                                icon={<PoweroffOutlined />}
                                loading={loadings[1]}
                                onClick={() => this.enterLoading(1)}
                            >
                                Click me!
                            </Button>
                            <Button
                                type="primary"
                                icon={<PoweroffOutlined />}
                                loading={loadings[2]}
                                onClick={() => this.enterLoading(2)}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="图标按钮">
                            <Tooltip title="search">
                                <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                            </Tooltip>
                            <Button type="primary" shape="circle">
                                A
                            </Button>
                            <Button type="primary" icon={<SearchOutlined />}>
                                Search
                            </Button>
                            <Tooltip title="search">
                                <Button shape="circle" icon={<SearchOutlined />} />
                            </Tooltip>
                            <Button icon={<SearchOutlined />}>Search</Button>
                            <br />
                            <Tooltip title="search">
                                <Button shape="circle" icon={<SearchOutlined />} />
                            </Tooltip>
                            <Button icon={<SearchOutlined />}>Search</Button>
                            <Tooltip title="search">
                                <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
                            </Tooltip>
                            <Button type="dashed" icon={<SearchOutlined />}>
                                Search
                            </Button>
                        </Card>
                        <Card title="不可用状态">
                            <Button type="primary">Primary</Button>
                            <Button type="primary" disabled>
                                Primary(disabled)
                            </Button>
                            <br />
                            <Button>Default</Button>
                            <Button disabled>Default(disabled)</Button>
                            <br />
                            <Button type="dashed">Dashed</Button>
                            <Button type="dashed" disabled>
                                Dashed(disabled)
                            </Button>
                            <br />
                            <Button type="text">Text</Button>
                            <Button type="text" disabled>
                                Text(disabled)
                            </Button>
                            <br />
                            <Button type="link">Link</Button>
                            <Button type="link" disabled>
                                Link(disabled)
                            </Button>
                            <br />
                            <Button danger>Danger Default</Button>
                            <Button danger disabled>
                                Danger Default(disabled)
                            </Button>
                            <br />
                            <Button danger type="text">
                                Danger Text
                            </Button>
                            <Button danger type="text" disabled>
                                Danger Text(disabled)
                            </Button>
                            <br />
                            <Button type="link" danger>
                                Danger Link
                            </Button>
                            <Button type="link" danger disabled>
                                Danger Link(disabled)
                            </Button>
                            <div className="site-button-ghost-wrapper">
                                <Button ghost>Ghost</Button>
                                <Button ghost disabled>
                                    Ghost(disabled)
                                 </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}