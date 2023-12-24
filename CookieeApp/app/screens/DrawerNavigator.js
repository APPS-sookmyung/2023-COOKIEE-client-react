import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { CategoryFix } from "../components/CategoryFix";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="카테고리 수정" component={CategoryFix} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
