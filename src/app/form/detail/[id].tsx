import { router } from "@/app";
import { editTodolist, getTodolist } from "@/utils/todoStore";
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function detailForm() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [text, setText] = useState<string>('');
  useEffect(() => {
    (async () => {
      const selectedTodo = (await getTodolist()).filter(todo => todo.id === Number(id));
      setText(selectedTodo[0].text);
    })();
  }, []);

  const handleSubmit = async () => {
    await editTodolist(Number(id), text); 
    router.back();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesomeFreeSolid name="arrow-left" size={20}/>
        </TouchableOpacity>
      </View>
      <View>
        <Text>목록 수정</Text>
        <TextInput
          style={styles.input}
          placeholder="제목"
          value={text}
          onChangeText={(text) => setText(text)}
          autoCapitalize="none"
        />
        <Button title="수정하기" onPress={handleSubmit} />
        <Button title="취소하기" onPress={() => router.back()} />
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
})