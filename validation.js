import express from 'express';
import {body, param, validationResult} from 'express-validator';

const app = express();
app.use(express.json());

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    console.log(errors.array());
    return res.status(400).json({message: errors.array()[0].msg});
}

app.get('/:email', [param('email').isEmail().withMessage('이메일을 입력하세요!'), valsidate], (req, res, next) => {
    res.send('💌');
});

app.post('/users',[
    body('name').trim().isLength({min:2}).withMessage('이름은 두글자 이상으로 입력!'),
    body('age').isInt({min:0, max:100}).withMessage('나이는 숫자로 입력!'),
    body('height').isInt({min:100, max:200}).withMessage('키는 100이상 200이하로 입력하세요!'),
    body('job').notEmpty(),
    validate
], (req, res, next) => {
    console.log(req.body);
    res.sendStatus(201);
})


app.listen(8080);
