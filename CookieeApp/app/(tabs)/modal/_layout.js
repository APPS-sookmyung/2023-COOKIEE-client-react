import { Stack } from "expo-router";

export default ModalLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "modal index",
        }}
      />
    </Stack>
  );
};
