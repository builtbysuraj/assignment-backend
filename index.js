import cors from "cors";
import express from "express";
import fetch from 'node-fetch';
const app = express();

app.use(cors())

const generateToken = async () => {
  const response = await fetch('https://dev-test.cimet.io/generate-token', {
    method: 'POST',
    headers: {
      'Api-key': '4NKQ3-815C2-8T5Q2-16318-55301',
    },
  });
  const data = await response.json();
  return data.token;
};

const getProducts = async (token) => {
  const response = await fetch('https://dev-test.cimet.io/plan-list', {
    method: 'POST',
    headers: {
      'Api-key': '4NKQ3-815C2-8T5Q2-16318-55301',
      'Auth-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id:
        'eyJpdiI6IkVNUkZ1N0hlSHhHSnJ3Vjl4aUlxc0E9PSIsInZhbHVlIjoieFlxa1wvVDYxQWl5U2pxMDFcL0R6ZVVvdEN6Mkk0R29TRDN3ZnN0U3VGcER0cEFMa2NVb0xNcDJudjlRTHRUbGJkIiwibWFjIjoiMTE0MmU0MGE5YmJhMzY4Nzc4MDExNmZkNTI1MjZhMGE3OTQyMDZmOTc1MTVmZDM1Mzc3ZmJmNjhmMzllOGYxYSJ9',
    }),
  });
  const data = await response.json();
  return data;
};

app.get('/products', async (req, res) => {
  const token = await generateToken();
  const products = await getProducts(token);
  res.json(products);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
