
function parseReceipt(prediction: JSON) {
  const items = prediction.lineItems;
}

export default async function getReceiptInfo(base64: string) {

  let data = new FormData();
  data.append("document", base64);

  const apiKey = "Token 824185fa963ea2846fbb9ad5ef0499a3"

  const result = await fetch("https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict", {
    method: 'POST',
    headers: {
      'Authorization': apiKey,
      "Content-Type": 'multipart/form-data'
    },

    body: data
  })

  const parsedResult = await result.json();

  console.log(parsedResult);
  console.log(parsedResult.document.inference.prediction);

}