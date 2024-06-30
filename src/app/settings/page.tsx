import { redirect } from "next/navigation";
import SettingsComponent from "~components/website/settings-page";
import { createClient } from "~utils/supabase/server";

const SettingsPage = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/authenticate/login')
  }
    return ( <div className="flex flex-col items-center h-screen">
        {<SettingsComponent />}
      </div> );
}
 
export default SettingsPage;