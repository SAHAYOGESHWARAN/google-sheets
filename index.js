const { google } = require('googleapis');


const auth = new google.auth.GoogleAuth({
    keyFile: './google.json',  
    scopes: ['https://www.googleapis.com/auth/spreadsheets']  
});

async function writeToSheet(values) {
    const sheets = google.sheets({ version: 'v4', auth });  
    const spreadsheetId = '1Xmtq9LtbSDCvGfrZsVmi8NACsKw55RxtQl4WdD_Mq0o';  
    const range = 'Sheet1!A1';  
    const valueInputOption = 'USER_ENTERED';  

    const resource = { values };  

    try {
        const res = await sheets.spreadsheets.values.update({
            spreadsheetId, range, valueInputOption, resource
        })
        return res; 
    } catch (error) {
        console.error('error', error);  
    }
}


async function readSheet() {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1Xmtq9LtbSDCvGfrZsVmi8NACsKw55RxtQl4WdD_Mq0o';
    const range = 'Sheet1!A1:E10'; 

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId, range
        });
        const rows = response.data.values; 
        return rows;  
    } catch (error) {
        console.error('error', error);  
    }
}


(async () => {
    const writer = await writeToSheet([['Name', 'Age', 'Location'], ['saha', 20, 'chennai'], ['jey', 25, 'chennai'], ['vj', 22, 'chennai']]);
    console.log(writer); 

    const data = await readSheet(); 
    console.log(data);  
})();