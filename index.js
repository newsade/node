const express= require('express');
const bodypraser=require('body-parser');
const app=express();
const path=require('path');
const dirname=path.join(__dirname);
const nodemailer=require('nodemailer');

app.use(express.static(dirname));
app.use(bodypraser.urlencoded());

const PORT=process.env.PORT||3000

app.get('',(req,res)=>{
    res.sendFile(__dirname+"/Home.html");
});

app.get('/about',(req,res)=>{
    res.sendFile(__dirname+"/about.html");
});

app.get('/Contact',(_,res)=>{
    res.sendFile(__dirname+"/Contact.html");
});
////varibale contain format of body
/// Mail sending code 
app.post("/Contact", (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:'azeem.khan@locofast.com',
            pass: 'daro@not2134'
        },
    });

    const mailOptions = {
        from: "azeem.khan@locofast.com",
        to: "azeem.khan@locofast.com",
        subject:"Someone Contact your site",
        html: "<p>Name: "+req.body.name+"</p> Email: "+req.body.email+"<p> Phone Number: "+req.body.number+
        "<p> Message: "+req.body.message
    };

    transporter.sendMail(mailOptions, (error, responose) => {
        if(error) {
            console.log(error);
            res.send("error")
        } else {
            res.send("Success full");
        }
    });
});

app.listen(PORT,console.log('server is listen'));