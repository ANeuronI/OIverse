interface Message{
    text : string,
    createdAt : admin.firestore.timestamps;
    user:{
        _id : string;
        name :string;
        avatar: string;
    };
}