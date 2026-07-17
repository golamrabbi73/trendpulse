import { Skeleton } from '@/components/ui/Skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';

export function CompetitorCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="mt-2 h-5 w-20 rounded-full" />
      </CardHeader>
      <CardContent className="flex-1 pb-3 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </CardContent>
      <CardFooter className="justify-between border-t pt-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </CardFooter>
    </Card>
  );
}
