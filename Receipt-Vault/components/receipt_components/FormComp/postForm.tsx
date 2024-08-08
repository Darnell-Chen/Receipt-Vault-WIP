import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';
import { SharedContext } from '@components/active_components/sharedContext';

type manual = {
  date: Date;
  store: string;
  description: string;
  total: string;
}

interface mindee {
  date: Date;
  store: string;
  items: {
    description: string;
    total_amount: number;
  }[];
  total: number;
}

const postData = async (values: manual | mindee, type: string) => {

  let receiptType = type;
  let token = "Bearer ";
  try {
    const storedToken = await SecureStore.getItemAsync('token');
    token = token + storedToken;

  } catch (e) {
    console.log("problem fetching token");
    alert("Problem fetching user auth token");
    return;
  }

  const result = await fetch(`${process.env.EXPO_PUBLIC_FETCH_URL}:3001/postReceipt`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
      'Receipt-Type': receiptType,
    },
    body: JSON.stringify(values)
  })

  console.log(result.status);
}

export default postData;