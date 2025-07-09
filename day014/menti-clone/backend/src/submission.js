const express=require('express');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const {PrismaClient}=require('@prisma/client');

dotenv.config();

const prisma=new PrismaClient();
const app=express();

app.post('/',async(req,res)=>{
    const {quizId,userId,questionId,isCorrect}=req.body;
    const token=req.headers.token;
    if(!token){
        res.status(401).json({error:'Unauthorized'});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
        res.status(401).json({error:'Unauthorized'});
    }
    const submission=await prisma.submission.create({
        data:{quizId,userId,questionId,isCorrect}
    });
    res.json(submission);
});

module.exports = {
    submissionRoutes: app
}