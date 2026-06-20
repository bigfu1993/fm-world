export type PublishStatus = 'unpublished' | 'pending-publish' | 'published' | 'pending-unpublish'

export const publishStatusMap = new Map<string, PublishStatus>()
