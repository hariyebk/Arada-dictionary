export const cities = [
    "Most places",
    "Addis Ababa",
    "Dire Dawa",
    "Mekele",
    "Hawasa",
    "Bahirdar",
    "Adama",
    "Gonder",
    "Harar",
    "Shashemene",
    "Jimma",
    "Dessie",
    "Arba minch",
    "Hosana"
]
export const rules = [
    {
        rule: "Be Inclusive",
        description: "Embrace diversity and inclusivity. Our community is made up of people from different backgrounds and cultures. Let's celebrate our differences and learn from each other."
    },
    {
        rule: "Keep it Clean",
        description: "Arada Dictionary is a family-friendly platform. Please refrain from using offensive language or posting inappropriate content. Let's keep the discussions clean and constructive."
    },
    {
        rule: "Stay on Topic",
        description: "Focus on slang and informal language-related discussions. While it's great to connect with fellow community members, let's try to keep the conversations relevant to the purpose of the platform"
    },
    {
        rule: "Anonymous Reporting",
        description: "If you come across a post that violates community guidelines or is otherwise inappropriate, you can flag it for review. Use the *Flag* button provided to report the post anonymously. Our moderators will promptly review flagged content and take appropriate action."
    },
    {
        rule: "Avoid Spamming",
        description: "Please refrain from spamming the platform with irrelevant or repetitive content. Let's keep the discussions meaningful and engaging for everyone."
    },
    {
        rule: "Help Each Other",
        description: "Arada Dictionary is a community-driven platform. If you see someone struggling to understand a word or phrase, lend a helping hand and share your knowledge."
    },
    {
        rule: "Have Fun",
        description: "Lastly, enjoy your time on Arada Dictionary! Learning new words and connecting with others can be a lot of fun. Let's make the most of our community and have a great time together."
    }
]

export enum formnames {
    word = "word",
    definition = "definition",
    examples = "examples",
    spokenArea = "spokenArea",
    tags = "tags"
}
export const DATABASE_CONNECTION_ERROR_MESSAGE = ["PrismaClientKnownRequestError", "PrismaClientInitializationError"]

export const CREDENTIALS_PROVIDER = "credentials"

export enum LIKE_DISLIKE {
    like = "like",
    dislike = "dislike"
}

export enum AUTH_STATUS {
    Authenticated = "Authenticated",
    unAuthenticated = "unAuthenticated"
}

export enum QUERY_PARAMS {
    city = "city",
    search = "search"
}