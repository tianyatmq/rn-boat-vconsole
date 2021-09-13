#rn-boat-vconsole

###Description
show log in your rn app ^_^

#Install:
```
npm install rn-boat-vconsole --save
```
#Example:
```js
import { ConsoleHooker, LogView }from "rn-boat-vconsole";

(new ConsoleHooker()).hook();
<LogView style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
         inverted={false}
         multiExpanded={true} timeStampFormat='HH:mm:ss' visible={this.state.logViewVisible}/>
<TouchableOpacity activeOpacity={0.6} onPress={() => {
    this.setState({
        logViewVisible: !this.state.logViewVisible
    });
}} style={{
    position: 'absolute',
    right: 100,
    bottom: 100,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    elevation: 3
}}>
    <Text style={{color: 'white'}}>DebugView</Text>
</TouchableOpacity>
```
项目工时（单位：小时）
minSdkVersion 24 （7.0）
targetSdkVersion 29
compileSdkVersion 30

项目框架初始化：4
sqlite初始化（数据库表，增删改查基础功能）：8
列表页页面搭建：2
大纲页页面搭建（带抽屉式切换和标题层次切换功能）：8
列表页功能（带新增，长按删除数据）：6
大纲页数据编辑功能：22
大纲内容撤销，展开，收缩功能：10
进入每个节点编辑（相关功能继承大纲页面相关功能）：8

总计68小时
预计两周完成
