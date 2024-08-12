import { Text, View, Image,TouchableOpacity} from "react-native";
import { useEffect } from "react";
import styles from "@/styles/mainStyle";
import { Link } from "expo-router";
import useAppFonts from "@/styles/useFonts";
import { createTables } from "@/database/tables/tables";
import { getData } from "@/database/services/userService";
const source = require('../assets/images/Fund_Flow-removebg-preview.png');

export default function Index() {
  const initializeDatabase = async () => {
    await createTables();
  };

  useEffect(() => {
    initializeDatabase();
  }, []);

  const { loaded, error } = useAppFonts();
  if (!loaded && !error) {
    return null;
  }

   async function getdata() {
    await getData();
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={source} style={styles.images} />
      </View>
      <View>
        <Text style={styles.text}>
          <Text style={styles.title}>F</Text>und<Text style={styles.title}>F</Text>low
        </Text>
      </View>
      <View style={styles.desc_container}>
        <Text style={styles.description}>Effortlessly manage and track your budgets.</Text>
      </View>
      <View style={styles.button_container}>
        <Link href={'/budget'} asChild>
        <TouchableOpacity style={styles.button} onPress={getdata}>
          <Text style={styles.button_text}>Start</Text>
        </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
