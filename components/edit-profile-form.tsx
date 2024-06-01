"use client";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useFormState, useFormStatus} from "react-dom";
import {updateProfile} from "@/app/actions/user/actions";
import {UserProfile} from "@/app/lib/definitions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>Save changes</Button>
    )
}

export default function EditProfileForm( { metadata } : { metadata : UserProfile }) {
    const initialState = { message: null, errors: {} };
    // @ts-ignore
    const [state, dispatch] = useFormState(updateProfile, initialState);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Account setting</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={dispatch}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">First name</Label>
                            <Input defaultValue={metadata.first_name} required
                                   name="first_name" id="name" placeholder="Your first name"/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Last name</Label>
                            <Input defaultValue={metadata.last_name} required
                                   name="last_name" id="name" placeholder="Your last name"/>
                        </div>
                        <div>
                            <SubmitButton/>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                {state.message && <p>{state.message}</p>}
            </CardFooter>
        </Card>
    )
}