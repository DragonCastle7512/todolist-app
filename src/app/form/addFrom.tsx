import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import { router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function addForm() {
  const [text, setText] = useState<string>("");
  const handleSubmit = () => {
    console.log('Submitted:', text);
  };
  const handleChangeText = (text: string) => {
    setText(text);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesomeFreeSolid name="arrow-left" size={20}/>
        </TouchableOpacity>
      </View>
      <View>
        <Text>새 목록 추가</Text>
        <TextInput
          style={styles.input}
          placeholder="제목"
          value={text}
          onChangeText={(text) => handleChangeText(text)}
          autoCapitalize="none"
        />
        <Button title="추가하기" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10
  },
  headerContainer: {
    width: '100%',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  }
});