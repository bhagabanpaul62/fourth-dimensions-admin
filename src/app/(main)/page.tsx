import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories, getContactRequests, getQuotationRequests, getTestimonials, getHeroImages } from "@/lib/data";
import { Building2, ClipboardList, Inbox, Sofa, Star, Image as ImageIcon, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function DashboardPage() {
  let interiorCount = 0;
  let constructionCount = 0;
  let testimonialCount = 0;
  let contactCount = 0;
  let quotationCount = 0;
  let heroImageCount = 0;
  let dbError: string | null = null;

  try {
    interiorCount = (await getCategories("interior")).length;
    constructionCount = (await getCategories("construction")).length;
    testimonialCount = (await getTestimonials()).length;
    contactCount = (await getContactRequests()).length;
    quotationCount = (await getQuotationRequests()).length;
    heroImageCount = (await getHeroImages()).length;
  } catch (error: any) {
    dbError = error.message;
  }

  const stats = [
    { title: "Interior Categories", value: interiorCount, icon: Sofa },
    { title: "Construction Categories", value: constructionCount, icon: Building2 },
    { title: "Testimonials", value: testimonialCount, icon: Star },
    { title: "Hero Images", value: heroImageCount, icon: ImageIcon },
    { title: "Contact Requests", value: contactCount, icon: Inbox },
    { title: "Quotation Requests", value: quotationCount, icon: ClipboardList },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" />

      {dbError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Database Connection Error</AlertTitle>
          <AlertDescription>
            <p>The application could not fetch data from the database. This is likely due to a permission issue.</p>
            <p className="font-mono text-xs mt-2 bg-background/20 p-2 rounded">Error: {dbError}</p>
            <p className="mt-2">Please ensure the user in your <strong>MONGODB_URI</strong> has the 'readWrite' role on the database. Refer to the instructions in <strong>README.md</strong> to resolve this.</p>
          </AlertDescription>
        </Alert>
      )}

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
