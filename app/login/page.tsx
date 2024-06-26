import Link from "next/link";
import {SubmitButton} from "./submit-button";
import {signIn, signUp} from "@/app/actions/auth/actions";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function Login() {
    return (
        <div className="flex items-center justify-center">

            <form>
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input id="first-name" name="firstName" placeholder="Max" required/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input id="last-name" name="lastName" placeholder="Robinson" required/>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                    id="email"
                                    type="email"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    id="password"/>
                            </div>
                            <SubmitButton
                                formAction={signIn}
                                className="mb-2"
                                pendingText="Signing In..."
                            >
                                Sign In
                            </SubmitButton>
                            <SubmitButton
                                formAction={signUp}
                                pendingText="Signing Up..."
                                buttonVariant="outline"
                            >
                                Sign Up
                            </SubmitButton>
                        </div>
                    </CardContent>
                </Card>
            </form>

        </div>
    );
}
