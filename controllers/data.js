const Questions = require('../models/Question')
const Scoreboard = require('../models/Scoreboard')

const getQuestions = async(req,res)=>{
    try
    {
        const data = await Questions.find({})
        res.status(200).json(data)
    }catch(err)
    {
        res.status(500).json({ success: false, error: err.message });
    }

}

const addQues = async(req,res)=>{
const { question, correctAnswer, category, options } = req.body    
try
    {
      const ques = {question,options:Object.values(options),answer:correctAnswer,tag:category}
      if(!category)
      {
       ques.tag = 'general'
      }
      await Questions.create({ ...ques });
      res.status(200).json({ success: true });

    }catch(err)
    {
        res.status(500).json({ success: false, error: err.message });
    }

}

const addQuestions = async (req, res) => {
    const data = req.body.questions;
    try {
        for (const element of data) {
         const ques = {question:element.question,options:Object.values(element.options),answer:element.correctAnswer,tag:element.category}
         if(!element.category)
         {
          ques.tag = 'general'
         }
            await Questions.create({ ...ques });
        }
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}


const delQues = async (req, res) => {
    const questionId = req.params.id;
    try {
      await Questions.findByIdAndRemove(questionId);
      res.status(200).json({ success: true, message: 'Question deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  const reset = async (req, res) => {
  
    try {
      await Questions.deleteMany({});
      res.status(200).json({ success: true, message: 'Reset successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };


  const getScores = async(req,res)=>{
    try
    {
        const data = await Scoreboard.find({})
        res.status(200).json(data)
    }catch(err)
    {
        res.status(500).json({ success: false, error: err.message });
    }

}

const addScore = async(req,res)=>{
    const element = req.body.info
    try
    {
      const score = {handle:element.handle,score:element.score,tag:element.category}
      await Scoreboard.create({ ...score });
      res.status(200).json({ success: true });

    }catch(err)
    {
        res.status(500).json({ success: false, error: err.message });
    }

}

module.exports = {getQuestions,addQues,addQuestions,delQues,reset,getScores,addScore}