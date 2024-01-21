
interface SkeletonLoaderProps {
    className?: string;
}

const SkeletonLoader = ({ className }: SkeletonLoaderProps) => {
  return (
    <div className={`${className ?? null} animate-pulse bg-gray-200 dark:bg-gray-400`}></div>
  )
}

export default SkeletonLoader