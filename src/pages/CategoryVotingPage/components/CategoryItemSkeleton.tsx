import SkeletonLoader from "@/ui/loaders/SkeletonLoader"

const CategoryItemSkeleton = () => {
  return (
    <div className="aspect-square w-[150px] max-w-[450px] relative md:w-[120px] sm:h-12 sm:aspect-auto sm:!w-full">
        <SkeletonLoader className="w-full h-full rounded-full"></SkeletonLoader>

        <SkeletonLoader className="absolute w-[60%] h-2 top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl !bg-white sm:top-1/2 sm:w-[50%] sm:left-[7%] sm:translate-x-0" />
        <SkeletonLoader className="absolute w-[80%] h-2 top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl !bg-white sm:top-1/2 sm:w-[30%] sm:left-[62%] sm:translate-x-0" />
        <SkeletonLoader className="absolute w-[50%] h-2 top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl !bg-white sm:hidden" />
    </div>
  )
}

export default CategoryItemSkeleton