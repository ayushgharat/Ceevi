// background.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'CHECK_AUTH') {
//         console.log("Message received")
//       chrome.cookies.get({ domain: "localhost", name:"sb-mfxchhpbazegjophaejs-auth-token" }, async (cookie) => {
//         if (cookie) {
//           const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//             headers: {
//               Authorization: `Bearer ${cookie.value}`,
//             },
//           });
  
//           const { data: { user }, error } = await supabase.auth.getUser();
//           if (user) {
//             sendResponse({ user });
//           } else {
//             sendResponse({ error: 'Failed to authenticate user' });
//           }
//         } else {
//           sendResponse({ error: 'No auth token found' });
//         }
//       });
  
//       return true;  // Indicates that the response will be sent asynchronously
//     }
//   });


