import { View } from "react-native";
import WordsListDisplay from './components/WordsListDisplay'

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WordsListDisplay />
    </View>
  );
}
