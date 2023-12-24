import { View, Text } from "react-native";
import React from "react";

import { Drawer } from "expo-router/drawer";

const DrawerLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "overview",
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
