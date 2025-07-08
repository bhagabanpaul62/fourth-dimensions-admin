import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories, getContactRequests, getQuotationRequests, getTestimonials, getHeroImages } from "@/lib/data";
import { Building2, ClipboardList, Inbox, Sofa, Star, Image as ImageIcon } from "lucide-react";
import { DbErrorAlert } from "@/components/db-error-alert";

export default async function DashboardPage() {
  let interiorCount = 0;
  let constructionCount = 0;
  let testimonialCount = 0;
  let contactCount = 0;
  let quotationCount = 0;
  let heroImageCount = 0;
  let dbError: any = null;

  try {
    // Promise.all to fetch in parallel for better performance
    const [
      interiorCategories,
      constructionCategories,
      testimonials,
      contactRequests,
      quotationRequests,
      heroImages
    ] = await Promise.all([
      getCategories("interior"),
      getCategories("construction"),
      getTestimonials(),
      getContactRequests(),
      getQuotationRequests(),
      getHeroImages(),
    ]);

    interiorCount = interiorCategories.length;
    constructionCount = constructionCategories.length;
    testimonialCount = testimonials.length;
    contactCount = contactRequests.length;
    quotationCount = quotationRequests.length;
    heroImageCount = heroImages.length;
  } catch (error: any) {
    dbError = error;
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

      {dbError && <DbErrorAlert error={dbError} />}

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
