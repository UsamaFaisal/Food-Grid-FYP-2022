import React from 'react';
import { View,Text, StyleSheet } from 'react-native';

const BarChart = ({ data ,labels}) => {
  // Calculate the maximum value in the data array
  const maxDataValue = Math.max(...data);

  return (
    <View style={styles.container}>
      {data.map((value, index) => {
        // Calculate the bar height relative to the maximum value
        const barHeight = (value / maxDataValue) * 200;

        return (
          <View>
              <View style={[styles.bar, { height: barHeight }]}>
                 <Text style={styles.valueText}>{value}</Text>            
              </View>
              <View>
                <Text>{labels[index]}</Text>
                 {/* <Text style={styles.label}>{labels[index]}</Text>  */}
              </View>
          </View>          
        );
      })}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  bar: {
    width: 25,
    alignItems:'center',
    alignSelf:'center',
    backgroundColor: 'steelblue',
    // marginRight: 8,
  },
});

export default BarChart;