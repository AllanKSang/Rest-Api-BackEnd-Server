const express=require('express');
const router=express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'orders were fetched'
    });
});

router.post('/:orderId', (req, res, next)=> {
    res.status(201).json({
        message: 'Order was created!',
        orderId: req.params.orderId
    })
});

router.delete('/:orderId', (req, res, next)=> {
    res.status(200).json({
        message: 'Order was deleted!',
        orderId: req.params.orderId
    })
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'order details',
        orderId: req.params.orderId
    });
});



module.exports=router;