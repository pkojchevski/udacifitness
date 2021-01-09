import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { purple, white } from '../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { calculateDirection } from '../utils/helpers';
import { Location, Permissions } from 'expo';
import Animated from 'react-native-reanimated';



class Live extends React.Component {
    state = {
        coords: null, 
        status: null,
        direction:'',
        bounceValue: new Animated.Value(1)
    }

    componentDidMount() {
        Permissions.getAssync(Permissions.LOCATION)
            then(({status}) => {
                if(status === 'granted') {
                    return this.setLocation()
                }
                this.setState({status}) 
            })
            .catch(error => {
                this.setState({status: 'undetermined'})
            })
    }



    askPermission = () => {
       Permissions.askAsync(Permissions.LOCATION)
           .then(({status}) => {
               if(status === 'granted') {
                   return this.setLocation();
               }

               this.setState({status})
           })
           .catch(err => {
               console.warn('err:', err)
           })
    }

    setLocation = () => {
        Location.watchPositionAsync({
            enableHighAccuracy: true,
            timeInterval: 1,
            distanceInterval: 1
        }, ({coords}) => {
            const newDirection = calculateDirection(coords.heading)
            const { direction, bounceValue } = this.state
            if(newDirection !== direction) {
                Animated.sequence([
                    Animated.timing(bounceValue, { duration:200, toValue:1.04}),
                    Animated.spring(bounceValue, { toValue:1, friction: 4})
                ]).start()
            }
            this.setState({
                coords,
                status: 'granted',
                direction: newDirection
            })
        })
    }

    render() {
      const { status, coords, direction, bounceValue } = this.state

      if(status) {
          return <ActivityIndicator style={{marginTop:30}} />
      }
      if(status === 'denied') {
        return (
        <View style={styles.center}>
            <Foundation name='alert' size={50}/>
            <Text>You denied your location. You can fix this by visiting your settings and enabling location services for this app</Text>
        </View>
        )
    }


    if(status === 'undertermined') {
        return (
        <View style={styles.center}>
            <Foundation name='alert' size={50}/>
            <Text>You need to enable location services for this app</Text>
            <TouchableOpacity onPress={this.askPermission} style={styles.button} >
                <Text style={styles.buttonText}>Enable</Text>
            </TouchableOpacity>
        </View>);
    }

    return (
        <View style={styles.container}>
            <View style={styles.directionContainer}>
                <Text style={styles.header}>You're heading</Text>
                <Animated.Text style={[styles.direction, {transform:[{scale: bounceValue}]}]}>{direction}</Animated.Text>
            </View>
            <View style={styles.metricContainer}>
                <View style={styles.metric}>
                    <Text style={[styles.header, {color: white}]}>
                        {coords.altitude * 3.2808}
                    </Text>
                    <Text style={[styles.subHeader, {color: white}]}>
                        {coords.speed * 2.2369} MPH
                    </Text>
                </View>
                <View style={styles.metric}>
                    <Text style={[styles.header, {color: white}]}>
                        Speed
                    </Text>
                    <Text style={[styles.subHeader, {color: white}]}>
                        {200} MPH
                    </Text>
                </View>
            </View>

        </View>
    )



}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    button: {
        padding:10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin:20
    },
    buttonText: {
        color: white,
        fontSize:20
    },
    directionContainer: {
        flex:1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 35,
        textAlign: 'center'
    },
    direction: {
        color:purple,
        fontSize: 120,
        textAlign: 'center'
    },
    metricContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: purple,
    },
    metric: {
        flex:1,
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        marginTop: 20,
        marginBottom: 20,
        marginLeft:20,
        marginRight:20,
    },
    subHeader: {
        fontSize:25,
        textAlign:'center',
        marginTop:5
    }
})

export default Live
