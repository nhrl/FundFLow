import { Text, View, Image,TouchableOpacity} from "react-native";
import { useEffect } from "react";
import styles from "@/styles/mainStyle";
import { router } from "expo-router";
import useAppFonts from "@/styles/useFonts";
import { createTables, dropTable} from "@/database/tables/tables";
import { checkBudget } from "@/database/services/budgetService";

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
    const isBudgetValid:boolean = await checkBudget();
    if(isBudgetValid == true)
      router.push('/calendar');
    else
      router.push('/budget');
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
        <TouchableOpacity style={styles.button} onPress={getdata}>
          <Text style={styles.button_text}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
