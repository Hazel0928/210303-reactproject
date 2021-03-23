
//生成指定区间随机数
export function randomNum(min,max) {
	return Math.floor(Math.random()*(max-min)+min)
}

// 计算提示框的宽度
export function calculateWidth(str) {
	return 30 + str.length * 15;
}