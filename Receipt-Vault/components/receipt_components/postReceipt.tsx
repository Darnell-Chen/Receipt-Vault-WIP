import * as SecureStore from 'expo-secure-store';

type storedReceipt = {
    store: string;
    total: number;
    items: any[];
    date: Date | string;
}

const postReceipt = async (uuid: string,receipt: storedReceipt) => {
    const token = await SecureStore.getItem

    const result = await fetch(`${process.env.EXPO_PUBLIC_FETCH_URL}:3001/postReceipt}`, {
        method: 'POST',

        }
    )
}