
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import{useNavigation} from '@react-navigation/native';
import { SafeAreaView,Button, View, Text ,TextInput , StyleSheet, ScrollView , TouchableOpacity, StatusBar} from 'react-native'
import { DataTable } from "react-native-paper";


const Startscreen =({ route })=>{

  const navigation = useNavigation();
  const [getPrice, setPrice ] = useState("");
  const [ getDiscount, setDiscount ] = useState("");
  const [getcal, setcal] = useState([]);

  const pricehandler = (e) => {
    if (e >= 0){
      setPrice(e)
    }
  }

  const Discounthandler= (e) => {
    if (e>=0 || e<=100){
      setDiscount(e)
    }
  }
  
  const saveresult = () => {
    let Price= getPrice;
    let discountedPrice =  Price - ((getDiscount / 100) * Price);
     setcal([...getcal,
      {
        key:Math.random().toString(),
        Price:getPrice,
        discountedpercentage:getDiscount,
        finalprice:discountedPrice 
      }

     ]);
     setPrice("");
     setDiscount("");
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="History" 
        onPress = { () => navigation.navigate('History' ,  getcal) }
        color="black"
        backgroundColor="black"
        borderBottomWidth="2"
        />
      ),
    });
  }, [navigation, ]);

  const saveButton = () => {
    if(!(getPrice== "" || getDiscount == "")){
        return(
         
            <TouchableOpacity style={{width: 150, marginVertical: 20}}>
                 <Button 
                    title="Save your data!"
                    onPress = {saveresult}
                    
                 />
             </TouchableOpacity>
        )
    } else {
        return(
            <TouchableOpacity style={{width: 150, marginVertical: 20}}>
                 <Button 
                    title="Save your data!"
                    onPress = {saveresult}
                    disabled
                 />
             </TouchableOpacity>
        )
    }
}
  return(
      
      <SafeAreaView>
          <View style={styles.container}>
              
          {saveButton()}
               
               <View style={styles.display}>
                   <Text style={styles.text} >Original Price</Text>
                  <TextInput 
                      style = {styles.Input}
                      onChangeText = {pricehandler}
                      value = {getPrice}
                      keyboardType = "number-pad"
                  />
               </View>

               <View style={styles.display}>
                   <Text style={styles.text} >Discount Percentage %</Text>
                  <TextInput 
                      style = {styles.Input}
                      onChangeText = {Discounthandler}
                      value = {getDiscount}
                      keyboardType = "number-pad"
                  />
               </View>

               <View style={{marginVertical: 20}}>
                  <Text style={{fontSize: 20}}>
                    <Text style={{fontWeight: 'bold', color: 'grey',fontSize: 20}}>You Save: </Text>
                    {(getPrice - (getPrice - ((getDiscount / 100) * getPrice))).toFixed(2)} </Text>
                  <Text style={{fontSize: 20}}>
                    <Text style={{fontWeight: 'bold', color: 'grey',}}>Final Price: </Text>
                    {(getPrice - ((getDiscount / 100) * getPrice)).toFixed(2)} </Text>
               </View>
          </View>  
      </SafeAreaView>
      
  )    
}
const Historyscreen =({navigation, route})=> {
  
  const [getcal1, setcal1] = useState(route.params);

  const Delete = (i) => {
    var calculation = getcal1.filter(item => item.i!= i);
    setcal1([...calculation]);
     }
    
  const deleteHistory =()=>{
    setcal1([]);
  }
  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title numeric >original Price</DataTable.Title>
          <DataTable.Title numeric >Discount (%)</DataTable.Title>
          <DataTable.Title numeric >final price</DataTable.Title>
          <DataTable.Title numeric >Delete</DataTable.Title>
        </DataTable.Header>

        <SafeAreaView>
          <ScrollView>
            {getcal1.map((item) => (
                <DataTable.Row key={item.key}>

                  <DataTable.Cell numeric>{item.Price}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.discountedpercentage}</DataTable.Cell>
                   <DataTable.Cell numeric>{item.finalprice}</DataTable.Cell>
                   <DataTable.Cell numeric>
                    <TouchableOpacity>
                      <Button title="x" onPress={() => Delete(item.key)}/>
                    </TouchableOpacity>
                  </DataTable.Cell>

                </DataTable.Row>
                
              )
            )}
            <Button title="clear-history" onPress={deleteHistory }/>
          </ScrollView>
        </SafeAreaView>
      </DataTable>
    </View>
  );
};



function App () {

 

  const Stack = createStackNavigator();

  return (
        <NavigationContainer>
          <Stack.Navigator >
              <Stack.Screen 
              name="Startscreen" 
              options={({ navigation, route }) => ({ title: "Discount Calculator",
              headerStyle: {
                backgroundColor: 'grey',
              },
           
              })}
              component={Startscreen} />
              
                           
             
              
              <Stack.Screen 
              name="History" 
              options={{title: "History",
              headerStyle: {
                backgroundColor: 'lightgrey',
              },
            }}
            component={Historyscreen} />

         
          </Stack.Navigator>
        </NavigationContainer>
        
  );
};
const styles = StyleSheet.create({


  container: {
    display: 'flex',
    alignItems:'center',
    
    marginTop:'0%'
    
},

Input: {
    width: 150,
    borderColor: 'gray',
    borderWidth: 2,
    marginHorizontal: 10,
    textAlign: 'center',
    fontSize: 20
  
},
text:{
  marginVertical: 10, 
  fontWeight: 'bold', 
  textTransform: 'uppercase',
   fontSize: 15
},
display:{
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center", 
  marginVertical: 20, 
},
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5

  },
  data: {
    
    fontSize: 18,
    width: 110,
    textAlign: 'center',
    fontWeight: "bold",
    width:79
    
},

});



export default App;