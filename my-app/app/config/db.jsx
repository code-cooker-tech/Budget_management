import { supabase } from './supabaseDB';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const handleSignIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
      if (error) {
        return { error: error.message };
      } else {
        return { success: 'Successfully signed in.', session: data.session };
      }
    } catch (error) {
      return { error: 'An unexpected error occurred.' };
    }
  };


  
export async function fetchAccountDate() {
  console.log("this is fetch");
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.error(sessionError.message);
    return null; 
  }
  const user = sessionData?.session?.user;
  if (!user) {
    console.error('no session');
    return null;
  }
  try {
    const { data, error: dbError } = await supabase
      .from('Account')
      .select('*')
      .eq('uuid', user.id);

    if (dbError) {
      console.error( dbError.message);
      return null; 
    }

    if (data.length > 0) {
      console.log(data[0]); 
      return data[0]; 
    }

    return null; 
  } catch (error) {
    console.error(error.message);
    return null; 
  }
}


export const storeData = async (key, value) => {
  try {
    console.log("clear")
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
    return 'Data stored successfully';
  } catch (e) {
    console.error('Error storing data:', e);
  }
};

const retrieveData = async (key) => {
  try {
    const retrievedValue = await AsyncStorage.getItem(key);
    return JSON.parse(retrievedValue);
  } catch (e) {
    console.error('Error retrieving data:', e);
  }
};


export const getInfo = async (key) => {
  try {
    const parsedData = await retrieveData(key);
    if (parsedData && parsedData.session) {
      const dataObject = {
        accessToken: parsedData.session.access_token,
        expiresAt: parsedData.session.expires_at,
        userId: parsedData.session.user.id,
        email: parsedData.session.user.email,
        successMessage: parsedData.success
      };
      return dataObject;
    } else {
      throw new Error('Invalid session data');
    }
  } catch (e) {
    console.error('Error retrieving info:', e);
  }
};
