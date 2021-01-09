import React from 'react';
import { View } from 'react-native';
import { gray } from '../utils/colors';

// import { Container } from './styles';

 const MetricCard = () => {
  return (<View>
      {date && <DateHeader date={date}/>}
      {Object.keys(metrics).map(metric => {
          const { getIcon, displayName, unit, backgroundColor} = getMetricMetaInfo(metric)
          return (
              <View style={styles.metric} key={metric}>
                 <Text style={{fontSize:20}}>
                     {displayName}
                 </Text>
                 <Text style={{fontSize:16, color:gray}}>
                     {metrics[metric]} {unit}
                 </Text>
              </View>
          )
      
      })}
  </View>);
}

const styles = StyleSheet.create({
    metric: {

    }
})

export default MetricCard
