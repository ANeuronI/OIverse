import openai from "./chatgpt";

const Query = async(prompt:string, chatId:string, model:string ) =>{

    const res =await openai.chat.completions.create({
       model : "llama3-8b-8192",
    //    model:"llama3-70b-instruct",
       messages:[{role:'user',content:prompt}],
       temperature:0.7,
       max_tokens:1024,
       top_p:1,
       frequency_penalty:0,
       presence_penalty:0,
    }).then(res=>res.choices[0].message.content).catch((err)=>`error (Error: ${err.message} )`);   

    return res;
};

export default Query;