require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const User = require('./models/User');
const Customer = require('./models/Customer');


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB bağlantısı başarılı');
}).catch((err) => {
    console.error('MongoDB bağlantısı başarısız', err);
});

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.get('/userspaginated', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const totalUsers = await User.countDocuments();
        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.send({
            totalUsers,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            users
        });
    } catch (err) {
        res.status(500).send({ message: 'Something went wrong' });
    }
});


app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
});

app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
});

app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.post('/customers', async (req, res) => {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send(customer);
});

app.get('/customers', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});

app.get('/customerspaginated', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const totalCustomers = await Customer.countDocuments();
        const users = await Customer.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.send({
            totalCustomers,
            currentPage: page,
            totalPages: Math.ceil(totalCustomers / limit),
            users
        });
    } catch (err) {
        res.status(500).send({ message: 'Something went wrong' });
    }
});

app.get('/customers/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        return res.status(404).send({ message: 'Customer not found' });
    }
    res.send(customer);
});

app.put('/customers/:id', async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(customer);
});

app.delete('/customers/:id', async (req, res) => {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor`);
});
