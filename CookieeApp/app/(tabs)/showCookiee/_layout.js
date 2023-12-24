import { Stack } from "expo-router";

export default showCookiee = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "showCookiee",
          headerShown: false,
        }}
      />
    </Stack>
  );
};
