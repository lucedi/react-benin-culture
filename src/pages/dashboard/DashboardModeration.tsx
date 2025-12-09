import DashboardLayout from "@/layouts/DashboardLayout";
import PendingContentList from "@/components/dashboard/PendingContentList";

const DashboardModeration = () => {
  return (
    <DashboardLayout 
      title="Modération" 
      description="Validez les contenus soumis par les contributeurs"
    >
      <PendingContentList />
    </DashboardLayout>
  );
};

export default DashboardModeration;
