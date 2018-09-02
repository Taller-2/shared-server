const router = require('express').Router();

router.get('/', (_, response) => response.send({ message: 'Hello World!' }));

module.exports = router;
