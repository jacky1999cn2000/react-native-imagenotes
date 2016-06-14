# imagenotes

* [30DaysofReactNative](https://github.com/okoala/30DaysofReactNative/tree/master/Project10-VideoBackground)
* [LayoutAnimation](https://egghead.io/lessons/react-react-native-layoutanimation-basics)
* [关于缓存](http://www.alloyteam.com/2016/03/best-practice-in-react-native/)
* [Animated Picker](https://medium.com/@dabit3/creating-an-animated-picker-for-react-native-a0785ad5a39c#.a6dvnejoe)
* [Keyboard](https://shift.infinite.red/avoiding-the-keyboard-in-react-native-56d05b9a1e81#.ooyfgligr)
* [EventEmitter with ES6](http://stackoverflow.com/questions/36774540/eventemitter-and-subscriber-es6-syntax-with-react-native)
```javascript
  //Route.js
  this.NavigationBarRouteMapper = {
     EventEmitter : new EventEmitter(),
     LeftButton: function(route, navigator, index, navState) {
       switch (route.name) {
         case 'detail':
         ...
      }
    },
    RightButton: function(route, navigator, index, navState) {
      switch (route.name) {
        case 'newItem':
          return (
            <BackButton
             onPress={() => {
               console.log('RightButton preview!');
               console.log('this.EventEmitter',this.EventEmitter);
               this.EventEmitter.emit('preview');
             }}
             customText='Preview'
            />
          );
        default:
          return null;
     }
    ...
  }

  //remember to pass events props to the subscriber component, since the API needs it to work
  renderScene = (route, navigator) => {
    let Component = ROUTE[route.name];
    if(route.name == 'newItem'){
      return <Component route={route} navigator={navigator} events={this.NavigationBarRouteMapper.EventEmitter}/>;
    }
    return <Component route={route} navigator={navigator} />;
  }

  //NewItem.js
  componentDidMount(){
    this.addListenerOn(this.props.events, 'preview', this.preview);
  }

  preview = () => {
    console.log('NewItem preview!');
  }

  ...
  reactMixin(NewItem.prototype, Subscribable.Mixin);
```
