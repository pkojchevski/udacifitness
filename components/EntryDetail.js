import React from 'react';
import { View } from 'react-native';
import { white } from '../utils/colors';
import { getDailyReminderValue } from '../utils/helpers';
import { removeEntry } from '../utils/api';
import { TextButton } from './TextButton';

// import { Container } from './styles';

 class EntryDetail extends React.Component {
    static navigationOptions = ({ navigation }) => {
     const { entryId } = navigation.state.params
     
     const year = entryId.slice(0, 4)
     const month = entryId.slice(5,7)
     const day = entryId.slice(8)

     return {
         title: `${month}/${day}/${year}`
     }
    }

    reset = () => {
        const { remove, goBack, entryId } = this.props

        remove()
        goBack()
        removeEntry(entryId)
    }

    shouldComponentUpdate(nextProps) {
       return nextProps.metrics !== null && !nextProps.metrics.today
    }


    render() {
        const { metrics, entryId } = this.props
      return (
          <View style={styles.container}>
             <MetricCard metrics = { metrics }/>
             <TextButton onPress={this.reset} style={{margin:20}}>
                 RESET
             </TextButton>
          </View>
      )
    }
}

const mapStateToProps = (state, { navigation }) => {
    const { entryId } = navigation.state.params

    return {
        entryId,
        metrics: state[entryId]
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    }
})

const mapDispatchToProps = (dispatch, { navigation }) => {
    const { entryId } = navigation.state.params

    return {
        remove: () => dispatch(addEntry({
            [entryId]:timeToString() === entryId
                   ? getDailyReminderValue()
                   : null
        })),
        goBack: navigation.goBack(),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)



