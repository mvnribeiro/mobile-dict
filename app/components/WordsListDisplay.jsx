import { useState, useEffect } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { database, ref, get, query, limitToFirst } from "../../firebaseConfig";

const WordList = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const wordsRef = query(ref(database), limitToFirst(20))
      const snapshot = await get(wordsRef);
      const data = snapshot.val()

      const words = Object.keys(data)
      setWords(words)
    } catch (error) {
      console.error("Error fetching words:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={words}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
              <Text>{ item }</Text>
          )}
        />
      )}
    </View>
  );
};

export default WordList;
