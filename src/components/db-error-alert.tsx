import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface DbErrorAlertProps {
    error: any;
    context?: string;
}

export function DbErrorAlert({ error, context = 'fetch data from' }: DbErrorAlertProps) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes("not found")) return null;

    return (
        <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Database Error</AlertTitle>
            <AlertDescription>
                <p>The application could not {context} the database. This is likely due to a permission issue.</p>
                <p className="font-mono text-xs mt-2 bg-background/20 p-2 rounded">Error: {errorMessage}</p>
                <p className="mt-2">Please ensure the user in your <strong>MONGODB_URI</strong> has the 'readWrite' role on the database. Refer to the instructions in <strong>README.md</strong> to resolve this.</p>
            </AlertDescription>
        </Alert>
    );
}
