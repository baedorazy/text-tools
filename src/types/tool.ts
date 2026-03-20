export interface Tool {
  id: string;
  name: string;
  desc: string;
  icon: string;       // SVG path string
  color: string;
  bg: string;
  shadow: string;
  badge?: string;
  path: string;       // route path
  keywords: string;   // SEO
}
