import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Image,
} from "react-native";
import * as firebase from "firebase";
import Cart from "../components/Cart";
import Header from "../components/Header1";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
const ManageCart = ({ route, navigation }) => {
  const [voucher, setvoucher] = useState("");
  const [totalPriceWithDiscount, setTotalPriceWithDiscount] = useState(
    totalPrice
  ); // Set initial value as totalPrice
  const [allvouchers, setallvouchers] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [username, setusername] = useState([]);
  const [longitude, setlongitude] = useState("");
  const [latitude, setlatitude] = useState("");

  const [error, setError] = useState(null);
  const [userphone, setuserphone] = useState([]);
  // const { longitude, latitude } = route.params;
  const { reclongitude, reclatitude } = route.params || {};
  const newReclongitude = reclongitude;
  const newReclatitude = reclatitude;
  // console.log("lat",newReclatitude);
  // console.log("lon",newReclongitude);
  const [isDetailsVisible, setDetailsVisible] = useState(false);
  const [gindex, setgindex] = useState([]);
  const [loading, setLoading] = useState(false);
  const totalcalories = Cart.reduce(
    (acc, item) => acc + Number(item.calories),
    0
  );
  const totalcarbs = Cart.reduce((acc, item) => acc + Number(item.carbs), 0);
  const totalfats = Cart.reduce((acc, item) => acc + Number(item.fats), 0);
  const totalprotein = Cart.reduce(
    (acc, item) => acc + Number(item.protein),
    0
  );
  const totalsodium = Cart.reduce((acc, item) => acc + Number(item.sodium), 0);
  const totalsugar = Cart.reduce((acc, item) => acc + Number(item.sugar), 0);
  const totalPrice = Cart.reduce(
    (acc, item) => acc + Number(item.itemPrice),
    0
  );

  const cuser = firebase.auth().currentUser;
  function getvoucher(val) {
    setvoucher(val);
    //console.log(mail)
  }
  function setvalue(val) {
    setTotalPriceWithDiscount(val);
    //console.log(mail)
  }

  const voucherbutton = () => {
    const matchedVoucher = allvouchers.find(
      (voucher1) => voucher1.vcode === voucher
    );
    if (matchedVoucher) {
      const discountedPrice =
        totalPrice - totalPrice * (matchedVoucher.vdiscountpercentage / 100);
      setTotalPriceWithDiscount(discountedPrice);
    } else {
      setTotalPriceWithDiscount(totalPrice);
      Alert.alert("Error", "Invalid Voucher.");
    }
  };
  const data = [
    totalcalories,
    totalprotein,
    totalsugar,
    totalsodium,
    totalfats,
    totalcarbs,
  ];
  const labels = ["Calories", "Protein", "Sugar", "Sodium", "Fats", "Carbs"];
  const maxDataValue = Math.max(...data);
  //    console.log('Mange cart',user.email);
  const groupedItems = Cart.reduce((acc, item) => {
    const existingItem = acc.find((group) => group.itemName === item.itemName);
    if (existingItem) {
      existingItem.count += 1;
      existingItem.itemPrice += parseInt(item.itemPrice, 10);
    } else {
      const count = existingItem ? existingItem.count : 1;
      acc.push({
        ...item,
        count: count,
        itemPrice: parseInt(item.itemPrice, 10),
      });
    }
    return acc;
  }, []);

  //   console.log(groupedItems);
  const getUserInfo = () => {
    const usersRef = firebase.database().ref("Users");
    const unsubscribe = usersRef.on("value", (snapshot) => {
      const users = snapshot.val();
      const usernamesArray = Object.keys(users)
        .map((key) => {
          const user = users[key];
          if (user.email === cuser.email) {
            setusername(user.name);
            setuserphone(user.phoneno);
            return user.name;
          }
          return null;
        })
        .filter((username) => username !== null);
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  };
  async function getLocation() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setlongitude(location.coords.longitude);
      setlatitude(location.coords.latitude);
      return location;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  function removeitem(index) {
    // setgindex(index);
    Cart.splice(index, 1);
    Alert.alert("Success", "Item removed successfully.");
  }
  useEffect(() => {
    getLocation();
    getUserInfo();
    setvalue(totalPrice);
    const userEmail = cuser.email;
    const userOrdersRef = firebase.database().ref("Vouchers");
    userOrdersRef.on("value", (snapshot) => {
      const vouchersData = snapshot.val();
      if (vouchersData) {
        const userVouchers = Object.values(vouchersData).filter(
          (voucher) => voucher.userid === userEmail
        );
        setallvouchers(userVouchers);
      } else {
        setallvouchers([]);
      }
    });
  }, []);
  const handleOrder = async () => {
    setLoading(true);
    try {
      const ordersRef = firebase.database().ref("Orders");
      const newOrderRef = ordersRef.child(cuser.uid).push();
      await newOrderRef.set({
        userEmail: cuser.email,
        userNumber: userphone,
        orderTime: new Date().toString(),
        Items: groupedItems,
        status: "pending",
        longitude: longitude,
        latitude: latitude,
      });
      Cart.splice(0, Cart.length);
      console.log("Order placed successfully!");
      Alert.alert(
        "Order Placed Successfully",
        "Your order has been placed successfully!",
        [{ text: "OK", onPress: () => navigation.navigate("Order") }]
      );
    } catch (error) {
      console.error("Error placing order:", error);
    }
    setLoading(false);
  };
  // console.log('Cart',Cart);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View>
        <Text style={styles.title}>Manage Cart</Text>
      </View>
      {groupedItems.length <= 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>No items selected</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 10, marginLeft: 25 }}>
            You have {groupedItems.length} items in your cart
          </Text>
          <FlatList
            data={groupedItems}
            renderItem={({ item, index }) => (
              <View style={styles.messageContainer}>
                <View style={styles.singleitem}>
                  <Text style={styles.itemSubtitle}>
                    {item.count} {item.itemName}
                  </Text>
                  <Text style={styles.itemSubtitle}>Rs.{item.itemPrice}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      removeitem(index);
                    }}
                  >
                    <Image
                      style={styles.imgsize}
                      source={require("../assets/delete.png")}
                    />
                    {/* <Text style={styles.button2}>Remove</Text> */}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View style={styles.container1}>
            {data.map((value, index) => {
              // Calculate the bar height relative to the maximum value
              const barHeight = (value / maxDataValue) * 200;

              return (
                <View>
                  {isDetailsVisible && (
                    <View>
                      <View
                        key={index}
                        style={[styles.bar, { height: barHeight }]}
                      >
                        <Text style={styles.valueText}>{value}</Text>
                      </View>
                      <View>
                        <Text>{labels[index]}</Text>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
          <ScrollView>
            <TouchableOpacity
              onPress={() => setDetailsVisible(!isDetailsVisible)}
              style={styles.buttontxt}
            >
              <Text style={styles.Detail}>Show Details</Text>
            </TouchableOpacity>
            {/* <Text style={{marginLeft:20,marginTop:7}}>
              <Text style={styles.grandTotal}>Grand Total: </Text>
              <Text style={styles.grandTotal1}>{totalPrice} PKR</Text>
            </Text> */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Apply Voucher"
                value={voucher}
                onChangeText={getvoucher}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={voucherbutton}
              >
                <Text >Apply</Text> 
              </TouchableOpacity>
            </View>

            <Text style={{marginLeft:20,marginBottom:20}}>
              <Text style={styles.grandTotal}>Grand Total: </Text>
              <Text style={styles.grandTotal1}>
                 {totalPriceWithDiscount} PKR
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Map", { longitude, latitude })
              }
            >
              <Text style={styles.button}>Set Location On Map</Text>
            </TouchableOpacity>
            {/* <Text style={styles.button} onPress={()=>navigation.navigate('Maps',{newReclatitude,newReclongitude})}></Text> */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleOrder}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Placing order..." : "Order(Cash On Delivery)"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text
                style={styles.buttonText}
                onPress={() =>
                  navigation.navigate("MakePayment", {
                    totalPriceWithDiscount: totalPriceWithDiscount,
                  })
                }
              >
                Online Pay
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imgsize: {
    width: 30,
    height: 30,
    // borderRadius: 15,
    // marginTop: 10,
    alignContent: "center",
    //alignContent:'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth:1,
    padding:7,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginBottom: 35,  
    marginTop:15,      
    marginLeft:20,
    marginRight:20,
  },
  container1: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    // borderWidth:1,
    borderRadius: 15,
  },
  bar: {
    width: 25,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "steelblue",
    // marginRight: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    height: 200,
    width: 200,
    marginBottom: 16,
  },
  emptyCartContainer: {
    marginLeft: 8,
  },
  heading: {
    marginLeft: 3,
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 10,
    marginLeft: 8,
    textAlign: "center",
  },
  iconContainer: {
    padding: 5,
    // borderRadius:30,

    
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    color: "black",
    backgroundColor: "#D3D3D3",
    width: 320,
    borderRadius: 8,
    margin: 20,
  },
  button: {
    backgroundColor: "steelblue",
    padding: 13,
    borderRadius: 8,
    marginBottom: 10,
    color: "black",
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  button2: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    color: "black",
    textAlign: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  buttonText: {
    color: "black",
    // fontWeight: 'bold',
    textAlign: "center",
  },
  grandTotal: {
    fontSize: 20,
    fontWeight: "bold",
    // marginVertical: 6,
    marginLeft: 10,
  },
  grandTotal1: {
    fontSize: 20,
    // fontWeight: 'bold',
    // marginVertical: 6,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 5,
    marginRight: 5,
  },
  singleitem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
  },
  itemSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  Detail: {
    color: "black",
    fontSize: 16,
    //fontWeight: 'bold',
    // width:50,
    // height:30,
  },
  buttontxt: {
    backgroundColor: "steelblue",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
  },
});

export default ManageCart;
