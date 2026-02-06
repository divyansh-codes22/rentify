import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { AuthForms } from "@/components/account/AuthForms";
import { UserDashboard } from "@/components/account/UserDashboard";

const AccountPage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className={isLoggedIn ? "container" : "container max-w-md mx-auto"}>
          {isLoggedIn ? <UserDashboard /> : <AuthForms />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
