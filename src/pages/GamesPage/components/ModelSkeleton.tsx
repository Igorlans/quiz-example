import SkeletonLoader from "@/ui/loaders/SkeletonLoader";

const ModelSkeleton = () => {
  return (
    <div>
      <SkeletonLoader className="aspect-square rounded-xl h-[150px] mx-auto" />
      <SkeletonLoader className=" rounded-xl h-3 mt-2 mx-auto max-w-[120px]" />
    </div>
  )
}

export default ModelSkeleton