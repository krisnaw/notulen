import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";


export async function POST(req: Request, res: Response) {
    const data = await req.json();

    const supabase = createClient()

    try {
        const {data: notes} = await supabase.from("articles").insert(data);
        // return success
        return Response.json({message: `Successfully created articles for `});

    } catch (error) {
        console.log(error);

        return Response.json({error: "Something went wrong"});
    }

}

// create PUT
export async function PUT(req: Request, res: Response) {
    const data = await req.json();
    return Response.json({message: `Successfully updated articles for `});
}