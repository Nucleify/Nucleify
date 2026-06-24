import { SkeletonProps } from 'primereact/skeleton'

type LoadingType = boolean | undefined

export interface SkeletonInterface extends SkeletonProps {
  loading?: LoadingType
}
