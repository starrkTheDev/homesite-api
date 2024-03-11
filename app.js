const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { uploadFile, getFile } = require('./s3');
const auth = require('./middleware/auth');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

const corsOptions = {
    origin: 'https://homesite-pzw0.onrender.com',
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/images/:key', (req, res) => {
    const key = req.params.key;
    const readStream = getFile(key);
    readStream.pipe(res);
});

app.post('/images', upload.single('image'), async (req, res) => {
    const file = req.file;
    const result = await uploadFile(file);
    res.send({ filename: result.Key });
});

app.use(auth);

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        customFormatErrorFn(err) {
            if (!err.originalError) {
                return err;
            }
            const data = err.originalError.data;
            const message = err.message || 'An error occurred';
            const code = err.originalError.code || 500;
            return { message: message, status: code, data: data }
        }
    }));

mongoose.connect(process.env.MONGODB_URI);

app.listen(8080);
