import Link from "next/link";
import UserMenu from "@/components/user-menu";
import {createClient} from "@/utils/supabase/server";
import {ModeToggle} from "@/components/mode-toggle";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

async function UserAuth() {
    const supabase = createClient();

    const {data: { user},} = await supabase.auth.getUser();

    if (user) {
        return (
            <UserMenu />
        )
    }
    return (
        <Link
            href="/login"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
            <span>Sign in</span>
        </Link>
    )
}

export default function NavigationBar() {

    return (
        <>
            <nav className="border-b bg-background">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                                        <span>Home</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="flex items-center space-x-4">

                                <Button variant="link" size="icon" asChild>
                                 
                                    <Link href="/search">
                                    <Search className="h-5 w-5" />
                                        <span className="sr-only">Search</span> 
                                        </Link>
                                </Button>

                                <ModeToggle/>
                                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                                    <UserAuth />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    );
}