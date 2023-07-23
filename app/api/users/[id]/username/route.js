import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params } ) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id)

        if(!user) return new Response('Username not found', { status: 404})

        const username = user.username

        return new Response(JSON.stringify(username), {status: 200})

    }   catch (error) {
        console.log(error)
        return new Response(error, { status: 500 })
    }
};

// PATCH  (update)
export const PATCH = async (request, { params }) => {
    const { username } = await request.json();

    try {
        await connectToDB();

        const user = await User.findById(params.id);

        if(!user) return new Response('Nie ma takiego użytkownika.', { status: 404 })

        // Check if the updated username is unique
        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== params.id) {
            return new Response('Nazwa użytkownika jest zajęta.', { status: 409 }); // 409 Conflict
        }
        user.username = username
        await user.save()
        return new Response('Nazwa użytkownika zmieniona pomyślnie.', { status: 200 } )

    } catch (error) {
        return new Response('Błąd. Spróbój ponownie.', { status: 500 })
        
    }
}
