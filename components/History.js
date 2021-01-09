import React from 'react';
import { View, StyleSheet } from 'react-native';
import { fetchCalendarResults } from '../utils/api';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { connect } from 'react-redux';
import UdaciFitnessCalendar from 'udacifitness-calendar'
import { DateHeader } from './DateHeader';
import { AppLoading } from 'expo';

 class History extends React.Component {
    state = {
        ready: false
    }
    componentDidMount() {
        const { dispatch} = this.props
        fetchCalendarResults()
            .then(({entries}) => {
                if(!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()]:getDailyReminderValue()
                    }))
                }
            })
            .then(() => this.setState({ready: true}))
    }

    renderItem = ({today, ...metrics}, formattedDate, key) => {
        return (
            <View style={styles.item}>
                {today 
                ?
                  <View>
                      <DateHeader date={formattedDate}/>
                      <Text style={styles.noDataText}>
                           {today}
                      </Text>
                  </View>
                :
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EntryDetail', {entryId:key}) }>
                   <MetricCard metrics={metrics} date={formattedDate}/>
                </TouchableOpacity>
                }
            </View>
        )
    }

    renderEmptyDate = (formattedDate) => {
        return (
            <View style={styles.item}>
                <DataHeader date={formattedDate}/>

                <Text style={styles.noDataText}>
                    You did not log any data on this day.
                </Text>
            </View>
        )
    }


    render() {
        const { entries } = this.props
        const { ready } = this.state

        if(ready) {
            return <AppLoading />
        }
        return (
        <UdaciFitnessCalendar 
            items = {entries}
            renderItem={this.renderItem}
            renderEmptyDate={this.renderEmptyData}
        />
    )
    }

}

const mapStateToProps = ({entries}) => ({
    entries
})

const styles = StyleSheet.style.create({
   item : {
       backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 10,
        marginLeft: 10,
        marginRight:10,
        justifyContent:'center',
        shadowRadius:3,
        shadowColor:'rgba(0,0,0,0.24)',
        shadowOffset: {
            width:0,
            height:3
        }
},
noDataText: {
    fontSize:20,
    paddingTop:20,
    paddingBottom:20
}
})

export default connect(mapStateToProps)(History)
