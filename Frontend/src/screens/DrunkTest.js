import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Layout,
  TopNav,
  themeColor,
  Section,
  SectionContent,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { Avatar, Card, Title, Paragraph, Divider } from "react-native-paper";
import { StatusBar } from "react-native";
import axios from "axios";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [Driver, setDriver] = useState();
  const [NIC, setNIC] = useState();

  const submit = async () => {
    await axios({
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      url: `http://10.0.2.2:5000/api/driver/${NIC}`,
    })
      .then((response) => {
        
        setDriver(response.data);
        navigation.navigate("NicDetails", { Driver: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkmode ? "light-content" : "dark-content"}
        hidden={false}
        backgroundColor={isDarkmode ? "#1B1B1F" : "#FFFFFF"}
        translucent={true}
      />

      <Layout>
        <TopNav
          // style={{elevation:0}}
          middleContent="Drunk Test"
          middleTextStyle={{
            fontFamily: "SFPRODISPLAYBOLD",
            color: isDarkmode ? "#E3E1E6" : "#585E71",
          }}
          //   style={{ fontFamily: "SFPRODISPLAYBOLD"}}
          backgroundColor={isDarkmode ? "#1B1B1F" : "#FFFFFF"}
          borderColor={isDarkmode ? "#1B1B1F" : "#FFFFFF"}
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={isDarkmode ? "#E3E1E6" : "#585E71"}
            />
          }
          leftAction={() => navigation.goBack()}
          rightContent={
            <Ionicons
              name={isDarkmode ? "sunny" : "moon"}
              size={20}
              color={isDarkmode ? "#E3E1E6" : "#585E71"}
            />
          }
          rightAction={() => {
            if (isDarkmode) {
              setTheme("light");
            } else {
              setTheme("dark");
            }
          }}
        />

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: isDarkmode ? "#1B1B1F" : "#FFFFFF",
          }}
        >
          <Text
            style={{
              fontFamily: "SFPRODISPLAYBOLD",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
              color: isDarkmode ? "#E3E1E6" : "#585E71",
            }}
          >
            License Checking
          </Text>

          <View
            style={{
              //   flex: 1,
              //   flexDirection: "row",
              margin: 15,
            }}
          >
            <TextInput
              containerStyle={{ marginTop: 5 }}
              placeholder="NIC No"
              style={{
                backgroundColor: isDarkmode ? "#44464E" : "#F9FAFA",
                height: 50,
                borderRadius: 10,
                borderColor: "#AFAFAF",
                borderWidth: 1,
                paddingLeft: 10,
                color: isDarkmode ? "#DDE1F9" : "#1B1B1F",
                placeholderTextColor: isDarkmode ? "#DDE1F9" : "#1B1B1F",
              }}
              value={NIC}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="visible-password"
              onChangeText={(text) => setNIC(text)}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#1A3370",
                width: "90%",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
              }}
              onPress={submit}
              // onPress={() => {
              //   navigation.navigate("NicDrunk");
              // }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "SFProTextBold",
                  color: isDarkmode ? "#FFFFFF" : "#FFFFFF",
                }}
              >
                Check
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
}
