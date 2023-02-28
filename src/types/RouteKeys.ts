enum RouteKeysEnum {
  home = 'home',
  about = 'about',
  contact = 'contact'
}

export type RouteKeys = keyof typeof RouteKeysEnum;
