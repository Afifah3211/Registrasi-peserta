import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "./src/screens/HomeScreen";
import PesertaListScreen from "./src/screens/PesertaListScreen";
import PesertaFormScreen from "./src/screens/PesertaFormScreen";
import PesertaDetailScreen from "./src/screens/PesertaDetailScreen";
import ProvinsiListScreen from "./src/screens/ProvinsiListScreen";
import ProvinsiFormScreen from "./src/screens/ProvinsiFormScreen";
import KabkoListScreen from "./src/screens/KabkoListScreen";
import KabkoFormScreen from "./src/screens/KabkoFormScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "PesertaTab") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "ProvinsiTab") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "KabkoTab") {
            iconName = focused ? "business" : "business-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2563eb", // blue-600
        tabBarInactiveTintColor: "#64748b", // slate-500
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#2563eb",
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="PesertaTab"
        component={PesertaListScreen}
        options={{ title: "Peserta" }}
      />
      <Tab.Screen
        name="ProvinsiTab"
        component={ProvinsiListScreen}
        options={{ title: "Provinsi" }}
      />
      <Tab.Screen
        name="KabkoTab"
        component={KabkoListScreen}
        options={{ title: "Kab/Kota" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#ffffff" },
          headerTitleStyle: { fontWeight: "bold", color: "#2563eb" },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        {/* Form and Detail screens are full screen, not in tabs */}
        <Stack.Screen
          name="PesertaForm"
          component={PesertaFormScreen}
          options={({ route }) => ({
            title: route.params?.id ? "Edit Peserta" : "Tambah Peserta",
          })}
        />
        <Stack.Screen
          name="PesertaDetail"
          component={PesertaDetailScreen}
          options={{ title: "Detail Peserta" }}
        />
        
        <Stack.Screen
          name="ProvinsiForm"
          component={ProvinsiFormScreen}
          options={({ route }) => ({
            title: route.params?.id ? "Edit Provinsi" : "Tambah Provinsi",
          })}
        />

        <Stack.Screen
          name="KabkoForm"
          component={KabkoFormScreen}
          options={({ route }) => ({
            title: route.params?.id ? "Edit Kab/Kota" : "Tambah Kab/Kota",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}