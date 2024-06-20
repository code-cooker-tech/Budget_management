import { supabase } from "./supabaseDB";
import { Alert } from "react-native";

export const saveIncomedb = async ({
  incomeSourceName,
  amount,
  exchange,
  dateReceived,
  notes,
  frequency,
  incomeType,
  userId,
}) => {
  try {
    let dataToInsert = {
      incomeSourceName,
      amount,
      exchange,
      dateReceived,
      notes,
      incomeType,
      uuid: userId,
    };

    if (incomeType === "Recurring") {
      dataToInsert.frequency = frequency;
    }

    const { data, error } = await supabase
      .from("Income")
      .insert(dataToInsert)
      .single();

    if (error) {
      console.error("error:", error);
      throw error;
    }

    console.log("successfull:", data);
    return "Income saved successfully!";
  } catch (error) {
    Alert.alert("Error", "Failed to save income");
    console.error("Error saving income:", error.message);
    return null;
  }
};
