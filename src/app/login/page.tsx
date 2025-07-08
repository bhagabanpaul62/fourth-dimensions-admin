import { redirect } from 'next/navigation';

// This page now permanently redirects to the homepage.
// This handles any old links or bookmarks pointing to the login page.
export default function LoginPage() {
  redirect('/');
}
