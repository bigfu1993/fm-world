import { delay } from '@/mock/db'
import { publishStatusMap, type PublishStatus } from '@/mock/publishStatus'

export function getPublishStatus(key: string): PublishStatus {
  return publishStatusMap.get(key) ?? 'unpublished'
}

export async function requestPublish(key: string): Promise<PublishStatus> {
  const current = getPublishStatus(key)
  if (current !== 'unpublished') {
    throw new Error('当前状态不允许发布')
  }
  publishStatusMap.set(key, 'pending-publish')
  return delay('pending-publish')
}

export async function requestUnpublish(key: string): Promise<PublishStatus> {
  const current = getPublishStatus(key)
  if (current !== 'published') {
    throw new Error('当前状态不允许取消发布')
  }
  publishStatusMap.set(key, 'pending-unpublish')
  return delay('pending-unpublish')
}
