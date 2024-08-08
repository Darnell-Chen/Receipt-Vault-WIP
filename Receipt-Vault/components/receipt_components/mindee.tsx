import postData from "./FormComp/postForm";

interface Receipt {
  date: {
    value: string;
  };
  supplier_name: {
    value: string;
  };
  line_items: {
    description: string;
    total_amount: number;
    polygon: any;
    confidence: any;
    page_id: any;
    quantity: any;
    unit_price: any;

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
    date: new Date(prediction.date.value)
  }

  for (let i = 0; i < newObject.items.length; i++) {
    delete newObject.items[i].polygon;
    delete newObject.items[i].quantity;
    delete newObject.items[i].page_id;
    delete newObject.items[i].unit_price;
    delete newObject.items[i].confidence;
  }

  console.log("from stringify: " + JSON.stringify(newObject, null, 2));

  postData(newObject, "mindee");

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
    console.log("pre-parse prediction \n" + prediction)
    parseReceipt(prediction);
  } catch (e) {
    alert("Receipt couldn't be read clearly");
    console.log("attempted prediction: " + prediction);
  }

}