const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 9000;
require('dotenv').config();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const supabaseUrl = process.env.SUPABASEURL;
const supabaseKey = process.env.KEYSUPA;
const supabase = createClient(supabaseUrl, supabaseKey);

const apasaja = 'apasajasi';  

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "member");
    },
    filename: function (req, file, cb) {
        const tanggal = new Date();
        const format = `${tanggal.getDate()}-${tanggal.getMonth() + 1}-${tanggal.getFullYear()}-${tanggal.getHours()}:${tanggal.getMinutes()}`;
        cb(null, `${format}-${file.originalname.replace(/\s+/g, '-')}`);
    }
});

const upload = multer({ storage: storage });

const keamanan = (req, res, next) => {
    const key = req.headers['authorization']?.split(' ')[1];
    if (key && key === apasaja) {
        next();
    } else {
        res.status(403).json({ Failed: "Unauthorized access. Key is invalid or missing." });
    }
}

const emojis = ["😀", "😂", "😍", "🤔", "😎", "😢", "🤗", "😇", "😜", "😱"];

const mabilemoji = () => {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

app.get('/', (req, res) => {
    res.status(200).json({ Success: "Data Siap Berjalan", Data: "Active", Database: "Supabase", GetRouteProjek: "/api/v1/projek", GetRouteMember: "/api/v1/member" });
});

app.get('/api/v1/member/pemula/di/geng/ferdi/saat/ini', async (req, res) => {
    const { data, error } = await supabase
        .from('member')
        .select('*');
    
    if (error) {
        res.status(500).json({ Gagal: error.message });
        return;
    }
    res.json(data);
});

app.post('/api/v1/member/post', async (req, res) => {
    const { nama, des } = req.body;
    const emo = mabilemoji(); 
    const { data, error } = await supabase
        .from('member')
        .insert([{ nama, des, emo }]);

    if (error) {
        res.status(500).json({ Gagal: error.message })

    } else {
        res.status(200).json({ Success: "Data berhasil ditambahkan", Data: data });
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di port http://localhost:${port}/api/v1/`);
});













// app.get('/api/v1/member', keamanan, async (req, res) => {
//     const { data, error } = await supabase
//         .from('member')
//         .select('*');
    
//     if (error) {
//         res.status(500).json({ Gagal: error.message });
//         return;
//     }
//     res.json(data);
//     console.log('member');
// });

// app.get('/api/v1/member/:filename', (req, res) => {
//     const filename = req.params.filename;
//     const filePath = path.join(__dirname, 'member', filename);
    
//     res.sendFile(filePath, (err) => {
//         if (err) {
//             console.error('File not found or error:', err);
//             res.status(404).send('File not found');
//         } else {
//             console.log('Sent:', filename);
//         }
//     });
// });

// app.post('/api/v1/post', upload.single('foto'), async (req, res) => {
//     console.log("POST /api/v1/post accessed");

//     try {
//         console.log("Request body:", req.body);
//         console.log("Request file:", req.file);

//         if (!req.file) {
//             return res.status(400).send('Tidak ada file yang diunggah.');
//         }

//         const { nama, des } = req.body;
//         const foto = req.file.path;

//         console.log("Nama:", nama);
//         console.log("Des:", des);
//         console.log("Foto path:", foto);

//         const { data, error } = await supabase
//             .from('member')
//             .insert([{ nama, des, foto }]);

//         if (error) {
//             console.error('Kesalahan saat menyisipkan data:', error);
//             res.status(500).send('Kesalahan Server Internal');
//             return;
//         }

//     } catch (error) {
//         console.error('Kesalahan server:', error);
//         console.log("Data inserted:", data);
//         res.status(200).json({ Berhasil: `Success ${data[0].id}` });
//     }
// });














// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const multer = require('multer')
// const path = require('path')
// const app = express()
// const port = 9000

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const mysql = require('mysql2');

// const db = mysql.createConnection({
//     host: 'localhost', 
//     user: 'root',
//     password: '',
//     database: 'porto'
// });

// db.connect((err) => {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log('connected as id ' + db.threadId);
// });



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "member")  
//     },
//     filename: function (req, file, cb) {
//         const tanggal = new Date();
//         const format = tanggal.getDate() + '-' + (tanggal.getMonth() + 1) + '-' + tanggal.getFullYear() + '-' + tanggal.getHours() + ':' + tanggal.getMinutes();
//         cb(null, format + '-' +  file.originalname.replace(/\s+/g, '-'))  
//     }
// });


// const upload = multer({ storage: storage });






// const keamanan = (req, res, next)=>{
//     const api = req.query.key
//     const key = 'dyfas'
//     if(api === key){
//         next()
//     }else{
//         res.status(403).json({ Failed: "Anda Bukan Jodoh Kami (; kawan", Info:"Kamu terdeteksi bukan admin kami!" })
//     }
// }

// app.get('/', (req,res)=>{
//     res.status(200).json({ Success: "Data Siap Berjalan", Data: "Active", Database: "Mysql", GetRouteProjek: "/api/v1/projek", GetRouteMember: "/api/v1/member"})
// })

// app.get('/api/v1/member', keamanan, (req,res)=>{
//     const query = "SELECT * FROM member"
//     db.query(query,(err, hasil)=>{
//         if(err){
//             res.status(500).json({Gagal : err})
//             return
//         }
//         res.json(hasil)
//         console.log('member')
//     })
// })


// app.get('/api/v1/member/:filename', (req, res) => {
//     const filename = req.params.filename;
//     const filePath = path.join(__dirname, 'member', filename);
    
//     res.sendFile(filePath, (err) => {
//         if (err) {
//             console.error('File not found or error:', err);
//             res.status(404).send('File not found');
//         } else {
//             console.log('Sent:', filename);
//         }
//     });
// });



// app.post('/api/v1/post',keamanan, upload.single('foto'), (req, res)=>{
//     try {
//         if (!req.file) {
//             return res.status(400).send('Tidak ada file yang diunggah.');
//         }

//         const { nama, des } = req.body;
//         const foto = req.file.path;

//         const query = 'INSERT INTO member (nama, des, foto) VALUES (?, ?, ?)';
//         db.query(query, [nama, des, foto], (err, result) => {
//             if (err) {
//                 console.error('Kesalahan saat menyisipkan data:', err);
//                 res.status(500).send('Kesalahan Server Internal');
//                 return;
//             }
//             res.status(200).json({ Berhasil: `Success ${result.insertId}` });
//         });
//     } catch (error) {
//         console.error('Kesalahan server:', error);
//         res.status(500).send('Kesalahan Server Internal');
//     }
// })


// // app.get('/api/v1/projek', keamanan, (req, res)=>{
// //     const query = "SELECT * FROM projek"
// //     db.query(query, (err, hasil)=>{
// //         if(err){
// //             res.status(500).json({ Gagal: err })
// //             return
// //         }
// //         res.json(hasil)
// //     })
// // })






// // app.post('/api/v1/post/projek', (req, res)=>{
// //     const { nama_projek, penjelasan, bahasa } = req.body
// //     const query = 'INSERT INTO projek (nama_projek, penjelasan, bahasa) VALUES (?, ?, ?)'
// //     db.query(query, [nama_projek, penjelasan, bahasa], (err, hasil)=>{
// //         if(err){
// //             res.status(500).json({ Gagal: err })
// //             return
// //         }
// //         res.json({ Sukses: "Sukses "+ nama_projek, penjelasan, bahasa })
// //     })
// // })




// // app.get('/api/v1/:name', keamanan, (req,res)=>{
// //     const nama_projek = req.params.name
// //     const query = "SELECT * FROM projek WHERE nama_projek = ?"
// //     db.query(query, [nama_projek], (err, hasil)=>{
// //         if(err){
// //             res.status(500).json({err: err})
// //             return
// //         }
// //         if (hasil.length > 0) {
// //             res.status(200).json(hasil[0]);
// //         } else {
// //             res.status(404).send('Data tidak ditemukan');
// //         }
// //     })
// // })
  





// app.listen(port, ()=>{
//     console.log(`Server is running on port http://localhost:${port}`)
// })