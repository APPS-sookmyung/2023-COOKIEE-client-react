import { Stack } from "expo-router";

export default HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          tabBarLabel: "Calendar Home",
          title: "Cookiee",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="day"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="form"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="updateForm"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="event"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="sidebar"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="categoryFix"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="categoryAdd"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="categoryEdit"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="collectCookiee"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="showCookiee"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="myPage"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
