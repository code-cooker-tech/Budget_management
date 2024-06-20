import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoWrapper}>
        <View className="w-full  pl-2">
        <Image
        source={require('../../assets/CBE.png')}
        style={styles.image}

        className="h-64 object-scale- w-full"
      />
            <StatusBar barStyle="light-content" backgroundColor="#c026d3" />

          <Text className="font-bold text-lg">Bugdet Management </Text>
        </View>
      </View>
    
    {/* my income */}
      <DrawerItem
        icon={({ color, size }) => (

          <MaterialIcons name="account-balance" size={24} color={pathname == "/myincome" ? "#f8fafc" : "#d946ef" }/>
        )}
        label={"My Income"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/myincome" ? "#fae8ff" : "#d946ef" },
        ]}
        style={{ backgroundColor: pathname == "/myincome" ? "#d946ef" : "#fae8ff" }}
        onPress={() => {
          router.push("/(drawer)/(tabs)/myincome");
        }}
      />



      {/* closed budget */}
      <DrawerItem
        icon={({ color, size }) => (
          <Octicons name="issue-closed" size={24} color={pathname == "/endedbugdet" ? "#fae8ff" : "#d946ef"} />
        )}
        label={"Closed Budget"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/endedbugdet" ? "#fae8ff" : "#d946ef" },
        ]}
        style={{ backgroundColor: pathname == "/endedbugdet" ? "#d946ef" : "#fae8ff" }}
        onPress={() => {
          router.push("/endedbugdet");
        }}

      />

            {/* about */}
    <DrawerItem
        icon={({ color, size }) => (
          <MaterialIcons name="account-balance-wallet" size={24} color={pathname == "/Income" ? "#fae8ff" : "#d946ef"} />
        )}
        label={"Income"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/Income" ? "#fae8ff" : "#d946ef" },
        ]}
        style={{ backgroundColor: pathname == "/Income" ? "#d946ef" : "#fae8ff" }}
        onPress={() => {
          router.push("/Income");
        }}
      />

      {/* help */}
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons name="settings" size={24} color={pathname == "/Settings" ? "#fae8ff" : "#d946ef"} />
        )}
        label={"Setting"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/Settings" ? "#fae8ff" : "#d946ef" },
        ]}
        style={{ backgroundColor: pathname == "/Settings" ? "#d946ef" : "#fae8ff" }}
        onPress={() => {
          router.push("/Settings");
        }}
      />
      

    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false , headerStyle: {
      backgroundColor: "#c026d3",
    },}}>
      <Drawer.Screen name="Income" options={{headerShown: true}} />
      <Drawer.Screen name="endedbugdet" options={{headerShown: true}} />
      <Drawer.Screen name="Settings" options={{headerShown: true}} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    fontSize: 18,
  },
  userInfoWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  userImg: {
    borderRadius: 40,
  },

  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize:16,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  }
});
