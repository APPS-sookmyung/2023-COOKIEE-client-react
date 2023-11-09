import { Pressable, Text } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <Link href="/about" asChild>
      <Pressable>
        <Text>Home</Text>
      </Pressable>
    </Link>
  );
}
