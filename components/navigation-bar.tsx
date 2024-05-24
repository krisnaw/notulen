import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";

import UserMenu from "@/components/user-menu";
import {createClient} from "@/utils/supabase/server";

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
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav
                    className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <span>Home</span>
                    </Link>
                    <Link
                        href="/login"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <span>Products</span>
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <span>Home</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Orders
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Customers
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                Settings
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">

                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                    <UserAuth />
                </div>
            </header>
        </>
    );
}