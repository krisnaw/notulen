import {redirect} from "next/navigation";
import {createClient} from "@/utils/supabase/server";
import EditProfileForm from "@/components/edit-profile-form";
import {UserProfile} from "@/app/lib/definitions";

export default async function Page() {
    const supabase = createClient();

    const {data: { user }} = await supabase.auth.getUser()
    if (!user) {
        redirect("/login");
    }
    const metadata = user.user_metadata

    const userProfile: UserProfile = {
        email: metadata.email,
        email_verified: metadata.email_verified,
        first_name: metadata.first_name,
        last_name: metadata.last_name,
        phone_verified: metadata.phone_verified,
        sub: metadata.sub
    }

    return (
        <div className="flex items-center justify-center">
            <EditProfileForm metadata={userProfile}/>
        </div>
    )
}