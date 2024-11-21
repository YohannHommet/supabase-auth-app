import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // Auth related
    requiresAuth?: boolean
    requiresGuest?: boolean
    roles?: ('admin' | 'user')[]

    // SEO related
    title?: string
    description?: string
    ogImage?: string

    // Layout related
    layout?: 'default' | 'auth' | 'admin'
    hideNavigation?: boolean

    // Transition related
    transition?: {
      enter?: string
      leave?: string
    }

    // Breadcrumb related
    breadcrumb?: {
      label: string
      parent?: string
    }
  }
}
