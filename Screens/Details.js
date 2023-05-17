import React from 'react';
import { View,Text ,  StyleSheet} from 'react-native';
import BarChart from '../components/server';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Header2';
const Details = () => {
    const route = useRoute();
    const { item} = route.params;
    const calories = parseInt(item.calories);
    const carbs = parseInt(item.carbs);
    const fats = parseInt(item.fats);
    const protein = parseInt(item.protein);
    const sodium = parseInt(item.sodium);
    const sugar = parseInt(item.sugar);
    const data = [calories, carbs,fats,protein, sodium,sugar];
    const labels = ["Calories", "Carbs", "Fats", "Proteins", "Sodium", "Sugar"];
    const chartData = [
        { value: 30, color: '#F44336' },
        { value: 45, color: '#2196F3' },
        { value: 25, color: '#4CAF50' },
      ];
//    const data = [20, 50, 35, 70, 45,40];
  return (
    <View>
     <Header />
     <Text></Text>
     <Text style={styles.itemName}>{item.itemName}</Text>
      <View style={styles.chartContainer}>
         <BarChart data={data} labels={labels} />
      </View>
   </View>
  );
};
const styles = StyleSheet.create({
    itemName: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 10,
    },
    chartContainer: {
      width: '95%',
      borderWidth: 1,
      marginLeft:8,
      backgroundColor: '#F0F0F0',
      borderRadius: 10,
      padding: 10,
    },
  });
  
export default Details;