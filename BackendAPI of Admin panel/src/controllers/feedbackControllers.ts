
import { Request, Response } from 'express';
import { createFeedback, findAndUpdateF, findFeedback, deleteFeedback, findF, findFeedbackAll } from '../services/feedback_Services'

//Insert Api of Feedback
const fInsert = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.json({ "status": 400, "message": "Please fill the data properly!!!" });
    }
    else {
        var { username, rating, feedback, user_Id } = req.body;
        const feed = await findFeedback({ user_Id });
        if (!feed) {
            const mydata = await createFeedback({
                username: username, rating: rating, feedback: feedback, user_Id
            });
            return res.json({ "status": 200, "message": "Data is successfully inserted!!" });
        }
        else {
            res.json({ "status": 401, "message": "Already Exist Feedback!!!" });
        }
    }

};

//Show BackEnd

const showFeedback = async (req: Request, res: Response) => {
    const feedbackData = await findF();
    res.json({ "status": 200, "message": "Data is successfully GET!!", data: feedbackData });

}

//Show FrontEnd
const show = async (req: Request, res: Response) => {
    const user = await findFeedbackAll({ active: true }).populate('user_Id');
    return res.json({ "status": 200, "message": "Data is successfully GET!!", data: user });

}


const deleteF = async (req: Request, res: Response) => {
    const id = req.params.id;
    const mydata = await deleteFeedback({ _id: id });
    return res.json({ "status": 200, "message": "Data is successfully deleted!!" });
};



const status = async (req: Request, res: Response) => {
    const id = req.params.id;
    const active = req.body.lastAction;
    const feedbackData = await findFeedback({ _id: id });
    if (feedbackData) {
        const a = feedbackData.active;
        const feed = await findAndUpdateF({ _id: id }, { active: !a }, { new: true });
        return res.json({ "status": 200, "message": "Status True successfully updated", data: feed })
    }

};

export { fInsert, showFeedback, deleteF, status, show }