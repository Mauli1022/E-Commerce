import paypal from "paypal-rest-sdk";

paypal.configure({
    mode : 'sandbox',
    client_id : 'AQ4uSFiMUJGNQzURK6NwAnUroW3EENTTeoKnFlSSDvv2qVYjRiYUuTm-ikuLcz8l8o6nE2q5V-dCLCH4',
    client_secret : 'EHtsrBOUNy67t8Uvy-UsMxvQLz3bswOekgIsvuic5xJh_A7d18hK0PWwCrbl8X7rs2zOLsKCY3OA9xNh'
})
// console.log(paypal);

export default paypal;