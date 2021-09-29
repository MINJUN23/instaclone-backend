import { buildSchemaFromTypeDefinitions } from "apollo-server-express";
import client from "../client"
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createAccount: async(_, {firstName,lastName,username, email, password})=>{
            //check if username or email are already on DB
            const existingUser = await client.user.findFirst({
                where:{
                    OR: [
                        {
                            username,
                        },{
                            email,
                        }
                    ]
                }
            });
            const uglyPasssword = await bcrypt.hash(password,10);
            console.log(uglyPasssword);
            return client.user.create({
                data:{
                    username, email, firstName, lastName, password:uglyPasssword
                }
            });
            // hash password
            // save and return the user
        }
    },
};