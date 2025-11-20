import { Skeleton } from "../ui/skeleton";

const BookingSkeletonGrid = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 border rounded-xl bg-white space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
          <Skeleton className="h-4 w-1/3 mt-4" />
        </div>
      ))}
    </div>
  );
}

export default BookingSkeletonGrid ;