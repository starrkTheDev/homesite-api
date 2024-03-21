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
    origin: '*',
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use('/graphql', cors(corsOptions));
app.use('/images', cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

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
    cors(corsOptions),
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        customFormatErrorFn(err) {
            if (!err.originalError) {
                return err;
            }
            const data = err.originalError.data;
            const message = err.message || 'An error occured';
            const code = err.originalError.code || 500;
            return { message: message, status: code, data: data }
        }
    }));

const database = process.env.MONGODB_URI;

const PORT = process.env.PORT || 443

mongoose
  .connect(database)
  .then(() => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
  .catch(err => console.log(`Error: ${err.message}`))

