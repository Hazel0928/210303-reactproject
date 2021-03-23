import React from 'react';
import { calculateWidth } from '../../utils/utils';

class Promptbox extends React.Component {
	componentDidMount() {
		this.addContent();
	}

	addContent() {
		let ctx = this.canvas.getContext('2d');//二维渲染上下文
		let width = calculateWidth(this.props.width[0]);
		ctx.strokeStyle = '#fff';
		ctx.shadowOffsetX = -2;//描述阴影水平偏移距离的属性
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2; //描述模糊效果程度的
		ctx.shadowColor = 'rgba(0,0,0,.3)';
		ctx.beginPath(); //新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径
		ctx.moveTo(0, 20); //将笔触移动到指定的坐标x以及y上
		ctx.lineTo(8, 16); //斜向上
		ctx.lineTo(8, 1); //竖直向上
		ctx.lineTo(width - 1, 1); //水平向右
		ctx.lineTo(width - 1, 39); //竖直向下
		ctx.lineTo(8, 39); //水平向左
		ctx.lineTo(8, 23); //竖直向上
		ctx.closePath(); //闭合路径之后，图形绘制命令又重新指向上下文 (这个方法会通过绘制一条从当前点到开始点的直线来闭合路径)
		ctx.stroke(); //通过线条来绘制图形轮廓
		ctx.fillStyle = '#D3D7F7'; //文字的颜色
		ctx.textBaseline = 'middle'; //决定文字垂直方向的对齐方式
		ctx.font = '14px sans-serif';
		ctx.beginPath(); 
		ctx.fillText(this.props.info, 20, 20); //在(x,y)位置填充文本
	}

	render() {
		return (
			<div style={this.props.style}>
				<canvas key={this.props.info} height="41" width={calculateWidth(this.props.width[0])} ref={(el) => this.canvas = el} />
			</div>
		);
	}
}
export default Promptbox;