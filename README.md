# RECEIPT VAULT

## About The Project

Receipt Vault is a mobile app that aims to rid you of your physical receipts.
It displays purchases similarly to how your banking app does:

- The Vendor / Retailer
- A Brief Itemized Description
- Receipt Total
- Date of Receipt

Using Mindee's Receipt OCR, users are able to capture receipts via their camera or upload with a manual input form.


### Built With

* ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Pre-Requisites
Before cloning the repo, there are a few pre-requisites:
- Node installed [Made with v20.13.1]
- MySQL installed [Made with v8.0.38]
- An API key from [Mindee](https://www.mindee.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 
1. Clone the repo
   ```sh
   git clone https://github.com/Darnell-Chen/Receipt-Vault-WIP-
   ```
2. Install NPM packages in both `./Receipt_Vault` and `./Server`
   ```sh
   npm install
   ```
3. Configure your .env in the React App (front end under `./Receipt_Vault`)
   ```js
   EXPO_PUBLIC_FETCH_URL = 'Your IP'

   EXPO_PUBLIC_MINDEE_API_KEY = 'YOUR MINDEE API KEY'
   ```
4. Configure your .env in the NodeJS (back end under `./Server`)
```js
    MYSQL_PASSWORD = 'YOUR MYSQL PASSOWRD'
    
    JWT_SECRET = 'A RANDOM JWT SECRET'
```
5. Open another terminal and run the following command in `./Server` to run the server:
```sh
  node index
```
6. Open a terminal and run the following command in `./Receipt_Vault` to run Expo:
```sh
  npx expo start
```

Then simply follow the instructions provided in Terminal by Expo

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact Me
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)][https://www.linkedin.com/in/darnell-chen/]

## Resources

* [Gorhom's Bottom Sheet](https://github.com/gorhom/react-native-bottom-sheet)
* [ReadMe Template](https://github.com/othneildrew/Best-README-Template/blob/main/README.md)
* [Markdown Badges](https://github.com/Ileriayo/markdown-badges)
