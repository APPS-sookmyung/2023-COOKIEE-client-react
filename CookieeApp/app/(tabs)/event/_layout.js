import { Stack } from "expo-router";

export default EventDetailLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "EventDetailLayout",
          headerShown: false,
        }}
      />
    </Stack>
  );
};
