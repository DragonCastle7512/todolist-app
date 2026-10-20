
import { Todo } from "@/types/todolist";
import { getTodolist, removeTodolist } from "@/utils/todoStore";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const router = useRouter();
export default function Index() {
  const [todo, setTodo] = useState<Todo[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        const todos = await getTodolist();
        if(active) setTodo(todos);
      })();

      return () => active = false;
    }, [])
  );

  const removeTodo = async (selectedId: number) => {
    setTodo(await removeTodolist(selectedId));
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Todolist</Text>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push('/form/settingForm')}>
            <FontAwesomeFreeSolid name="gear" size={20}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/form/addFrom')}>
            <FontAwesomeFreeSolid name="plus" size={20}/>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {todo.map((item) => (
          <View key={item.id} style={styles.todolist}>
            <TouchableOpacity onPress={() => removeTodo(item.id)} style={styles.checkButton}/>
            <Text style={styles.viewText}>{item.text}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    color: 'white',
    backgroundColor: "white",
    padding: 10
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: 20
  },
  menu: {
    flexDirection: 'row',
    gap: 10
  },
  checkButton: {
    width: 10,
    height: 10,
    borderRadius: 50,
    borderWidth: 1,
  },
  todolist: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    alignItems: 'center'
  },
  viewText: {
    textAlign:'center'
  }
});
