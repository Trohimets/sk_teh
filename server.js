// server.js  
const express = require('express');  
const bodyParser = require('body-parser');  
const pool = require('./db');  


const app = express();  
const PORT = process.env.PORT || 3000; 


app.use(bodyParser.json());  
  
app.post('/modify', async (req, res) => {  
    const { id, add } = req.body;  

    try {  
        // Проверяем, существует ли запись с заданным id  
        const result = await pool.query('SELECT obj FROM sk_example_table WHERE id = $1', [id]);  

        if (result.rows.length === 0) {  
            // Если запись не найдена, возвращаем статус 418  
            return res.sendStatus(418);  
        }  

        // Извлекаем текущее значение current из obj  
        const obj = result.rows[0].obj;  
        const current = obj.current;  

        // Увеличиваем значение current  
        const newCurrent = current + add;  

        // Обновляем запись в таблице  
        await pool.query('UPDATE sk_example_table SET obj = $1 WHERE id = $2', [JSON.stringify({ current: newCurrent }), id]);  

        // Возвращаем новое значение  
        res.json({ current: newCurrent });  
    } catch (error) {  
        console.error('Ошибка при запросе к базе данных', error);  
        return res.sendStatus(418);  
    }  
});  

// Запуск сервера  
app.listen(PORT, () => {  
    console.log(`Сервер запущен на http://localhost:${PORT}`);  
});  