// import { mailingList } from "@/db/schema"; // your table schema
import { createUser } from "@/lib/actions";
import { logError } from "@/lib/errorLogger";

export async function POST(req: Request) {

    try {
        const formData = await req.formData();
        const data = Object.fromEntries(formData);
        console.log('data', data)

        const full_name = formData.get("full_name") as string;
        const age = Number(formData.get("age") as string);
        const email = formData.get("email") as string;


        // const email = formData.get('email');
        // console.log('email', email)
        await createUser(full_name, age, email)

        return Response.json({
            ok: true,
            message: "Form stored successfully",
        });

    } catch (err: any) {
        console.error("::::::::", err);

        // Always return JSON, never plain text
        await logError({
            message: err.message,
            // stack: err.stack,
            service: "server",
            level: "error",
            path: req.url,
            payload: { sql: err.cause?.sql, sqlMessage: err.cause?.sqlMessage },
        });

        return new Response(JSON.stringify({
            success: false,
            error: err.cause?.sqlMessage
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
    // Example Drizzle insert
    // await db.insert(mailingList).values({
    //     position: data.position,
    //     positionOther: data.positionOther ?? null,
    //     referralSource: data.referralSource,
    //     recommender: data.recommender ?? null,
    //     createdAt: new Date()
    // });
    // await createUser("John Doe", 20, "john@example.com")
}



// try {
//     const formData = await req.formData();

//     const nameEntry = formData.get('name');
//     const ageEntry = formData.get('age');
//     const emailEntry = formData.get('email');

//     const name = typeof nameEntry === 'string' ? nameEntry : '';
//     const age = typeof ageEntry === 'string' ? Number(ageEntry) : NaN;
//     const email = typeof emailEntry === 'string' ? emailEntry : '';

//     console.log('data', { name, age, email })

//     if (!name || Number.isNaN(age) || !email) {
//         throw new Error('Invalid form data');
//     }

//     await createUser(name, age, email);
// }