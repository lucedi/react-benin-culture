import DashboardLayout from "@/layouts/DashboardLayout";
import UserManagement from "@/components/dashboard/UserManagement";

const DashboardUsers = () => {
  return (
    <DashboardLayout 
      title="Utilisateurs" 
      description="Gérez les rôles et permissions des utilisateurs"
    >
      <UserManagement />
    </DashboardLayout>
  );
};

export default DashboardUsers;
