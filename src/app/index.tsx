
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  type Todo = {
    id: number;
    text: string;
  }
  const [id, setId] = useState<number>(1);
  const [todo, setTodo] = useState<Todo[]>([]);
  const addTodo = () => {
    setTodo([...todo, {id: id, text: '해야할 일'+id}])
    setId(id+1);
  }
  const removeTodo = (selectedId: number) => {
    setTodo(prevTodo => prevTodo.filter(todo => todo.id !== selectedId))
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Todolist</Text>
        <TouchableOpacity onPress={() => addTodo()}>
          <FontAwesomeFreeSolid name="plus" size={20}/>
        </TouchableOpacity>
      </View>
      <View>
        {todo.map((item) => (
          <View key={item.id} style={styles.todolist}>
            <TouchableOpacity onPress={() => removeTodo(item.id)} style={styles.checkButton}/>
            <Text style={styles.viewText}>{item.text}</Text>
          </View>
        ))}
      </View>
    </View>
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
