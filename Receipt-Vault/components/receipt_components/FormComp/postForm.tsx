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

const postData = async (values: manual | mindee, uuid: string, type: string) => {

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
        'uuid': uuid,
        'dataType': receiptType, 
      },
      body: JSON.stringify(values)
    })
  }

  export default postData;