import LoginPage from "@/components/LoginPage";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div> 
        Home page. First check if there is user logged in, then route to "/", otherwise to "/login"
        Add logic within layout.js to check if there is a user. Then remove navbar if so
      </div>
    </main>
  ); 
}
  