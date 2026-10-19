import Slider from '@react-native-community/slider';
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import { router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function settingForm() {
  const [textSize, setTextSize] = useState<number>(20);

  const handleSubmit = () => {
    console.log('Submitted:', textSize);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesomeFreeSolid name="arrow-left" size={20}/>
        </TouchableOpacity>
      </View>
      <Text>글자크기</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={10}
        maximumValue={50}
        step={1}
        value={textSize}
        onValueChange={(val) => setTextSize(val)}
        minimumTrackTintColor="#1FB28A"
        maximumTrackTintColor="#d3d3d3"
      />
      <Button title="저장" onPress={handleSubmit} />
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
  }
});