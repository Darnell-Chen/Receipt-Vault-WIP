interface Receipt {
  date: {
    value: string | Date;
  };
  supplier_name: {
    value: string;
  };
  line_items: {
    description: string;
    total_amount: number;
  }[];
  total_amount: {
    value: number;
  };
}

function parseReceipt(prediction: Receipt) {

  const newObject = {
    store: prediction.supplier_name.value,
    total: prediction.total_amount.value,
    items: prediction.line_items,
    date: prediction.date.value
  }

  console.log(newObject);

  return newObject;
}

export default async function getReceiptInfo(base64: string) {

  let data = new FormData();
  data.append("document", base64);

  const apiKey = "Token " + process.env.EXPO_PUBLIC_MINDEE_API_KEY;

  const result = await fetch("https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict", {
    method: 'POST',
    headers: {
      'Authorization': apiKey,
      "Content-Type": 'multipart/form-data'
    },

    body: data
  })

  const jsonResult = await result.json();

  const prediction = jsonResult.document.inference.prediction

  try {
    parseReceipt(prediction);
  } catch {
    alert("Receipt couldn't be read clearly");
    console.log("attempted prediction: " + prediction);
  }

}