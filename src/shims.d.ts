import 'vue-router';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<object, object, any>;
  export default component;
}

declare module 'vue-router' {
  interface RouteMeta {
    // Auth related
    requiresAuth?: boolean;
    requiresGuest?: boolean;
    roles?: ('admin' | 'user')[];

    // SEO related
    title?: string;
    description?: string;
    ogImage?: string;

    // Layout related
    layout?: 'default' | 'auth' | 'admin';
    hideNavigation?: boolean;

    // Transition related
    transition?: {
      enter?: string;
      leave?: string;
    };

    // Breadcrumb related
    breadcrumb?: {
      label: string;
      parent?: {
        label: string;
        path: string;
      };
    };
  }
}
