import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories, getContactRequests, getQuotationRequests } from "@/lib/data";
import { Building2, ClipboardList, Inbox, Sofa } from "lucide-react";

export default async function DashboardPage() {
  const interiorCount = (await getCategories("interior")).length;
  const constructionCount = (await getCategories("construction")).length;
  const contactCount = (await getContactRequests()).length;
  const quotationCount = (await getQuotationRequests()).length;

  const stats = [
    { title: "Interior Categories", value: interiorCount, icon: Sofa },
    { title: "Construction Categories", value: constructionCount, icon: Building2 },
    { title: "Contact Requests", value: contactCount, icon: Inbox },
    { title: "Quotation Requests", value: quotationCount, icon: ClipboardList },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="mt-8">
        <Card>
            <CardHeader>
                <CardTitle>Welcome to ArchiControl</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">This is your admin panel for managing interior and construction services. Use the sidebar to navigate between different sections.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
