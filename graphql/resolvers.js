const Post = require('../models/post');
const PlotPost = require('../models/plotPost');
const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    createPost: async function ({ postInput}, req) {

        console.log("postInput:", postInput);

        if (req.isAuth = false) {
            const error = new Error('Not authenticated');
            console.log('Not authenticated');
            error.code = 401;
            throw error;
        }

        const errors = [];

    
        if (!validator.isLength(postInput.title, { min: 10 })) {
            errors.push({
                message: "Tytuł nie może być krótszy niż 10 znaków"
            });
        };

        if (validator.isEmpty(postInput.estate)) {
            errors.push({
                message: "Proszę wybrać nieruchomość",
            });
        };

        if (validator.isEmpty(postInput.purpose)) {
            errors.push({
                message: "Proszę wybrać przeznaczenie lokalu"
            });
        };

        if (validator.isEmpty(postInput.market)) {
            errors.push({
                message: "Proszę wybrać rynek"
            });
        };

        if (validator.isEmpty(postInput.heating)) {
            errors.push({
                message: "Proszę wybrać ogrzewanie"
            });
        };

        if (postInput.year === undefined || postInput.year === 0 || postInput.year === '') {
            errors.push({
                message: "Proszę podać rok budowy"
            });
        };

        if (validator.isEmpty(postInput.availability)) {
            errors.push({
                message: "Proszę podać od kiedy lokal jest dostępny"
            });
        };

        if (postInput.price === undefined || postInput.price === 0 || postInput.price === '') {
            errors.push({
                message: "Proszę podać prawidłową cenę"
            });
        };

        if (postInput.area === undefined || postInput.area === 0 || postInput.area === '') {
            errors.push({
                message: "Proszę podać prawidłowy metraż"
            });
        };

        if (validator.isEmpty(postInput.place)) {
            errors.push({
                message: "Proszę podać lokalizację"
            });
        };

        if(postInput.number.length < 9) {
            errors.push({
                message: "Proszę wpisać poprawny numer"
            });
        };

        if (!postInput.imagePath) {
            errors.push({
                message: "Proszę dodać zdjęcie"
            });
        };

        if(errors.length > 0 ) {
            throw new Error(errors.map(error => error.message).join(', '));
        };

        const pricePerSquareMeter = postInput.price / postInput.area;
        console.log(pricePerSquareMeter);

        const user = await User.findById(req.userId);
        console.log(user);

        if(!user) {
            const error = new Error('User not found');
            error.code = 401;
            throw error;
        }

        const post = new Post({
            title: postInput.title,
            estate: postInput.estate,
            purpose: postInput.purpose,
            market: postInput.market,
            heating: postInput.heating,
            price: postInput.price,
            area: postInput.area,
            year: postInput.year,
            availability: postInput.availability,
            place: postInput.place,
            rooms: postInput.rooms,
            level: postInput.level,
            garage: postInput.garage,
            balcony: postInput.balcony,
            lift: postInput.lift,
            ac: postInput.ac,
            basement: postInput.basement,
            storage: postInput.storage,
            description: postInput.description,
            imagePath: postInput.imagePath,
            number: postInput.number,
            pricePerSquareMeter: pricePerSquareMeter,
            creator: user._id
        })


        const createdPost = await post.save();
        user.posts.push(createdPost);

        const savedUser = await user.save();

        return {
            _id: createdPost._id,
            title: createdPost.title,
            estate: createdPost.estate,
            purpose: createdPost.purpose,
            market: createdPost.market,
            heating: createdPost.heating,
            price: createdPost.price,
            area: createdPost.area,
            year: createdPost.year,
            availability: createdPost.availability,
            place: createdPost.place,
            rooms: createdPost.rooms,
            level: createdPost.level,
            garage: createdPost.garage,
            balcony: createdPost.balcony,
            lift: createdPost.lift,
            ac: createdPost.ac,
            basement: createdPost.basement,
            storage: createdPost.storage,
            description: createdPost.description,
            imagePath: createdPost.imagePath,
            number: createdPost.number,
            pricePerSquareMeter: createdPost.pricePerSquareMeter,
            createdAt: createdPost.createdAt.toISOString(),
            updatedAt: createdPost.updatedAt.toISOString()
        }
    },

    createPlotPost: async function ({ plotPostInput}, req) {

        if (req.isAuth = false) {
            const error = new Error('Not authenticated');
            console.log('Not authenticated');
            error.code = 401;
            throw error;
        }

        const errors = [];

     
        if (!validator.isLength(plotPostInput.title, { min: 10 })) {
            errors.push({
                message: "Tytuł nie może być krótszy niż 10 znaków"
            });
        };

        if (plotPostInput.price === undefined || plotPostInput.price === 0 || plotPostInput.price === '') {
            errors.push({
                message: "Proszę podać prawidłową cenę"
            });
        };

        if (plotPostInput.area === undefined || plotPostInput.area === 0 || plotPostInput.area === '') {
            errors.push({
                message: "Proszę podać prawidłowy metraż"
            });
        };

        if(plotPostInput.number.length < 9) {
            errors.push({
                message: "Proszę wpisać poprawny numer"
            });
        };

        if (validator.isEmpty(plotPostInput.place)) {
            errors.push({
                message: "Proszę podać lokalizację"
            });
        };

        if (!plotPostInput.imagePath) {
            errors.push({
                message: "Proszę dodać zdjęcie"
            });
        };


        if(errors.length > 0 ) {
            throw new Error(errors.map(error => error.message).join(', '));
        };

        const pricePerSquareMeter = plotPostInput.price / plotPostInput.area;

        const user = await User.findById(req.userId);
        console.log(user);

        if(!user) {
            const error = new Error('User not found');
            error.code = 401;
            throw error;
        }

        const plotPost = new PlotPost({
            title: plotPostInput.title,
            estate: plotPostInput.estate,
            price: plotPostInput.price,
            area: plotPostInput.area,
            place: plotPostInput.place,
            description: plotPostInput.description,
            imagePath: plotPostInput.imagePath,
            number: plotPostInput.number,
            pricePerSquareMeter: pricePerSquareMeter,
            creator: user._id
        })

        const createdPlotPost = await plotPost.save();

        user.plotPosts.push(createdPlotPost);

        const savedUser = await user.save();

        return {
            _id: createdPlotPost._id,
            title: createdPlotPost.title,
            estate: createdPlotPost.estate,
            price: createdPlotPost.price,
            area: createdPlotPost.area,
            place: createdPlotPost.place,
            description: createdPlotPost.description,
            imagePath: createdPlotPost.imagePath,
            number: createdPlotPost.number,
            pricePerSquareMeter: createdPlotPost.pricePerSquareMeter,
            createdAt: createdPlotPost.createdAt.toISOString(),
            updatedAt: createdPlotPost.updatedAt.toISOString()
        }
    },

    getApartmentPosts: async function () {
        const apartmentPosts = await Post.find({ estate: "apartments" });
        return apartmentPosts;
    },

    getHousePosts: async function () {
        const housePosts = await Post.find({ estate: "houses" });
        return housePosts;
    },

    getPlotPosts: async function () {
        const plotPosts = await PlotPost.find();
        return plotPosts;
    },

    singlePost: async function ({ id }) {
        const singlePost = await Post.findById(id);
        return singlePost;
    },

    singlePlotPost: async function ({ id }) {
        const singlePlotPost = await PlotPost.findById(id);
        return singlePlotPost;
    },
    
    getMatchingPosts: async function ({ searchInput }, req) {
        const { 
            minPrice,
            maxPrice,
            minArea,
            maxArea,
            level,
            rooms,
            minYearBuilt,
            maxYearBuilt,
            minPricePerSquareMeter,
            maxPricePerSquareMeter,
            heating,
            garage,
            balcony,
            lift,
            ac,
            basement,
            storage,
            ...rest
            } = searchInput;

        const query = {
            ...rest,
            ...(minPrice && maxPrice && { price: { $gte: minPrice, $lte: maxPrice } }),
            ...(minArea && maxArea && { area: { $gte: minArea, $lte: maxArea } }),
        };

        if (heating !== undefined && heating !== null && heating !== '') {
            query.heating = heating;
        };

        if (level !== undefined && level !== null && level !== '' && level !== 0) {
            query.level = level;
        };

        if (rooms !== undefined && rooms !== null && rooms !== '' && rooms !== 0) {
            query.rooms = rooms;
        };

        if (minYearBuilt !== undefined && minYearBuilt !== null && minYearBuilt !== '') {
            query.year = { ...query.year, $gte: minYearBuilt };
        };
        
        if (maxYearBuilt !== undefined && maxYearBuilt !== null && maxYearBuilt !== '') {
            query.year = { ...query.year, $lte: maxYearBuilt };
        };

        if (minPricePerSquareMeter !== undefined && minPricePerSquareMeter !== null && minPricePerSquareMeter !== '') {
            query.pricePerSquareMeter = { ...query.pricePerSquareMeter, $gte: minPricePerSquareMeter };
        };
        
        if (maxPricePerSquareMeter !== undefined && maxPricePerSquareMeter !== null && maxPricePerSquareMeter !== '') {
            query.pricePerSquareMeter = { ...query.pricePerSquareMeter, $lte: maxPricePerSquareMeter };
        };

        if (garage) {
            query.garage = true;
        };
    
        if (balcony) {
            query.balcony = true;
        };
    
        if (lift) {
            query.lift = true;
        };
    
        if (ac) {
            query.ac = true;
        };
    
        if (basement) {
            query.basement = true;
        };
    
        if (storage) {
            query.storage = true;
        };
    
        const matchingPosts = await Post.find(query);
        return matchingPosts;
    },

    createUser: async function ({userInput, email}, req) {

        const errors = [];

        const existingUser = await User.findOne({email: userInput.email});
        if (existingUser) {
            errors.push({message:'Konto z podanym e-mailem już istnieje'})
        }

        if (!validator.isEmail(userInput.email)) {
            errors.push({ message: 'Niewłaściwy email'});
        }

        if (validator.isEmpty(userInput.name) || (!validator.isLength(userInput.name, {min: 6}))) {
            errors.push({ message: 'Zbyt krótka nazwa użytkownika'});
        }

        if (validator.isEmpty(userInput.password) || (!validator.isLength(userInput.password, {min: 8}))) {
            errors.push({ message: 'Zbyt krótkie hasło'});
        }

        if(errors.length > 0 ) {
            throw new Error(errors.map(error => error.message).join(', '));
        } 

        const hashedPw = await bcrypt.hash(userInput.password, 12);
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPw
        });

        const createdUser = await user.save();
        return {...createdUser._doc, _id: createdUser._id.toString()};
    },

    login: async function({email, password}) {

        const errors = [];

        const user = await User.findOne({email: email});
        if(!user) {
            errors.push({message:'Nie znaleziono takiego użytkownika'})
        } else {
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                errors.push({message:'Błędne hasło'})
            }
        }

        if(errors.length > 0 ) {
            throw new Error(errors.map(error => error.message).join(', '));
        } 

        const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email,
        },
        'somesupersecret', {expiresIn : '1h'});

        return { token: token, userId: user._id.toString(), email: email }
    },

    getUserPosts: async function ({ userId }, req) {
        const userPosts = await Post.find({ creator: userId });
        return userPosts;
    },

      getUserName: async function (req) {
        const user = await User.findById(req.userId);
        if (!user) {
            throw new Error('User not found');
        }
        console.log(user.name);
        return user.name;
    }

};
