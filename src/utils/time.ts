//获取当前时间为:早上|中午|下午|晚上
export const getTime = () => {
  //获取当前时间
  const hours = new Date().getHours()
  if (hours < 6) {
    return '凌晨'
  } else if (hours < 9) {
    return '早上'
  } else if (hours < 12) {
    return '上午'
  } else if (hours < 14) {
    return '中午'
  } else if (hours < 18) {
    return '下午'
  } else {
    return '晚上'
  }
}
