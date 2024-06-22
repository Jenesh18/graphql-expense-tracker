import { users } from "../dummyData/data.js"
import User from "../models/user.model.js";

const userResolver ={
 Mutation: {
   signUp: async(_,{input},context) => {
    try {
      const {username, name, password, gender} = input;

      if(!username || !name || !password || !gender){
        throw new Error("All fields are required");
      }
      const existingUser =await User.findOne({username})
      if(existingUser){
        throw new Error("User already exists");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password,salt);

      const boyProfilePic = `https://avtar.iram.liara.run/public/boy?username=${username}`
      const girlProfilePic = `https://avtar.iram.liara.run/public/girl?username=${username}`

      const newUser = new User({
        username,
        name,
        password:hashedpassword,
        gender,
        profilePicture:gender === "male" ? boyProfilePic : girlProfilePic 
      })

      await newUser.save();
      await context.login(newUser);
      return newUser;

    } catch (error) {
        console.error("Error in singup:",error);
        throw new Error(error.message || "Internal server error");

    }
   },

   login: async(_,{input},context) => {
    try {
      const {username, password} = input;
      const {user} = await context.authenticate("graphql-local",{username,password});

      await context.login(user);
      return user
    
    } catch (error) {
        console.error("Error in login:",error);
        throw new Error(error.message || "Internal server error");

    }
   },

   logout: async(_, _, context) => {
    try {
       await context.logout();

       req.session.destroy((err)=>{
        if(err) throw err;
       });

       resizeBy.clearCookie("connect.sid");

       return {message: "Logged out successfully"  }
    } catch (error) {
        console.error("Error in logout:",error);
        throw new Error(error.message || "Internal server error");

    }
   },


 },
 Query:{   
    authUser: async( _,_,context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
          console.error("Error in authUser:",error);
          throw new Error(error.message || "Internal server error");

      }
    }, 
    user: async (_,{ userId }) =>{
      try {
        const user = await User.findById(userId);
        return user ;
      } catch (error) {
        console.error("Error in authUser:",error);
        throw new Error(error.message || "Internal server error");
      }
    }
 }
 // TODO => ADD USER/TRANSACTION RELATION
}

export default userResolver ;