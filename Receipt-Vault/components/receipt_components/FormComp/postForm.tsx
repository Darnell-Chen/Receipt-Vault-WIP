import * as SecureStore from 'expo-secure-store';

type manual = {
    store: string;
    total: string;
    description: string;
  }

type mindee = {
    store: string;
    total: string | number;
    items: string[] | number[] | JSON[];
    date: Date | string;
}

const postData = async (values: manual | mindee) => {

    let receiptType = typeof values;
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
      headers: {
        method: 'POST',
        authorization: token,
        'Content-Type': 'application/json',
        'Receipt-Type': receiptType
      },
      body: JSON.stringify(values)
    })
  }

  export default postData;