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
