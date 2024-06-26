import { z } from "zod";

export const AuthenticationFormSchema = z.object({
    firstname: z.string().min(2, {message: "first name is too short"}).max(10, {message: "first name is too long"}).optional(),
    lastname: z.string().min(2, {message: "last name is too short"}).max(10, {message: "last name is too long"}).optional(),
    username: z.string().min(3, {message: "username is too short"}).optional(),
    email: z.string().email(),
    password: z.string().min(3, {message: "password is required"}),
    confirmPassword: z.string().min(3, {message: "confirm password is required"}).optional()
}).refine(
    (value) => {
        if(value.confirmPassword && value.password !== value.confirmPassword){
            return false
        }
        else{
            return true
        }
    }, 
    {
        message: "Passwords must match!",
        path: ["confirmPassword"],
    }
)
export const WordDefinitionFormSchema = z.object({
    word: z.string().min(2, {message: "The word is too short"}).max(10, {message: "The word is too long"}),
    definition: z.string(),
    examples: z.string(),
    spokenArea: z.string()
}).refine(
    (value) => {
        return  /[^a-zA-Z0-9]/.test(value.word)
    },
    {
        message: "The word should be Amharic",
        path: ["word"]
    }
).refine(
    (value) => {
        return /,/.test(value.examples)
    },
    {
        message: "use comma at the end of each example",
        path: ["examples"]
    }
).refine(
    (value) => {
        const testarray =  value.examples.split(",")
        return Boolean(testarray[testarray.length - 1])
    },
    {
        message: "provide at least two examples. and don't use comma on the last one",
        path: ["examples"]
    }
).refine(
    (value) => {
        const testarray =  value.examples.split(",")
        return testarray.length > 1
    },
    {
        message: "provide at least 2 examples",
        path: ["examples"]
    }
)