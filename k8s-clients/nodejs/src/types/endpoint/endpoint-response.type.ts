import { ContentType } from "../http/http-headers"

export interface EPResponseType {
  contentType: ContentType
  data: any
}